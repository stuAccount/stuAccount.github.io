/**
 * GitHub API 集成模块
 * ============================================================
 * - 动态获取用户资料、仓库、活动数据
 * - localStorage 缓存（默认 10 分钟）
 * - 加载状态与错误降级处理
 * - 自动填充带有 data-github 属性的 DOM 元素
 *
 * 用法：
 *   <span data-github="stat:stars">加载中...</span>
 *   GitHubAPI.init(); // 自动填充
 *
 * 支持的 data-github 值：
 *   stat:contributions / stat:streak / stat:stars / stat:repos
 *   profile:avatar / profile:bio / profile:followers / profile:following
 *   repos:list / activity:list / blog:list
 */

const GitHubAPI = (function () {
  const CACHE_KEY = "gh_cache_v1";
  const CACHE_TTL = (window.SITE_CONFIG && window.SITE_CONFIG.cacheTTL) || 600000;
  const USERNAME = (window.SITE_CONFIG && window.SITE_CONFIG.githubUsername) || "stuAccount";
  const FALLBACK = (window.SITE_CONFIG && window.SITE_CONFIG.fallback) || {};

  /* ---------- 缓存读写 ---------- */
  function getCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() - data.ts > CACHE_TTL) return null;
      return data.payload;
    } catch {
      return null;
    }
  }

  function setCache(payload) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), payload }));
    } catch {
      /* localStorage 不可用时静默失败 */
    }
  }

  /* ---------- API 请求 ---------- */
  async function fetchJSON(url) {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github.v3+json" },
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    return res.json();
  }

  async function fetchAll() {
    // 先读缓存
    const cached = getCache();
    if (cached) return cached;

    const base = `https://api.github.com/users/${USERNAME}`;
    const [profile, repos, events] = await Promise.allSettled([
      fetchJSON(base),
      fetchJSON(`${base}/repos?sort=stars&per_page=6&type=owner`),
      fetchJSON(`${base}/events?per_page=10`),
    ]);

    const data = {
      profile: profile.status === "fulfilled" ? profile.value : FALLBACK.profile,
      repos: repos.status === "fulfilled" ? repos.value : FALLBACK.repos,
      events: events.status === "fulfilled" ? events.value : [],
      // 至少一个成功才算在线
      online: profile.status === "fulfilled" || repos.status === "fulfilled",
      ts: Date.now(),
    };

    // 计算汇总统计
    data.stats = computeStats(data);
    data.activity = parseActivity(data.events);

    setCache(data);
    return data;
  }

  /* ---------- 数据计算 ---------- */
  function computeStats(data) {
    const repos = data.repos || [];
    const stars = repos.reduce((s, r) => s + (r.stargazers_count || r.stars || 0), 0);
    const fb = FALLBACK.stats || {};
    return {
      contributions: fb.contributions,
      streak: fb.streak,
      stars: stars || fb.stars,
      repos: (data.profile && data.profile.public_repos) || fb.repos,
    };
  }

  function parseActivity(events) {
    if (!events || !events.length) return FALLBACK.activity || [];

    const colorMap = {
      PushEvent: "#00f0ff",
      PullRequestEvent: "#a855f7",
      ReleaseEvent: "#22c55e",
      IssuesEvent: "#ec4899",
      CreateEvent: "#f59e0b",
      ForkEvent: "#06b6d4",
    };

    return events.slice(0, 6).map((e) => {
      const repo = e.repo ? e.repo.name.split("/").pop() : "";
      let action = "";
      let desc = "";
      switch (e.type) {
        case "PushEvent":
          action = `Pushed to ${repo}`;
          desc = (e.payload.commits || []).slice(0, 1).map((c) => c.message).join("") || "code update";
          break;
        case "PullRequestEvent":
          action = e.payload.action === "closed" ? `PR merged in ${repo}` : `PR opened in ${repo}`;
          desc = (e.payload.pull_request && e.payload.pull_request.title) || "";
          break;
        case "ReleaseEvent":
          action = `Released in ${repo}`;
          desc = (e.payload.release && e.payload.release.name) || "new release";
          break;
        case "IssuesEvent":
          action = `${e.payload.action} issue in ${repo}`;
          desc = (e.payload.issue && e.payload.issue.title) || "";
          break;
        case "CreateEvent":
          action = `Created ${e.payload.ref_type} in ${repo}`;
          desc = e.payload.ref || "";
          break;
        default:
          action = `${e.type.replace("Event", "")} in ${repo}`;
          desc = "";
      }
      return {
        type: e.type,
        action,
        desc,
        time: timeAgo(e.created_at),
        repo,
        color: colorMap[e.type] || "#64748b",
      };
    });
  }

  function timeAgo(dateStr) {
    if (!dateStr) return "";
    const diff = Date.now() - new Date(dateStr).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 7) return `${day}d ago`;
    const wk = Math.floor(day / 7);
    return `${wk}w ago`;
  }

  /* ---------- DOM 自动填充 ---------- */
  function fillStat(key, val) {
    document.querySelectorAll(`[data-github="stat:${key}"]`).forEach((el) => {
      el.textContent = typeof val === "number" ? val.toLocaleString() : val;
      el.classList.add("gh-loaded");
    });
  }

  function fillProfile(profile) {
    const set = (key, val) => {
      document.querySelectorAll(`[data-github="profile:${key}"]`).forEach((el) => {
        if (key === "avatar") {
          el.src = val;
        } else {
          el.textContent = val;
        }
        el.classList.add("gh-loaded");
      });
    };
    set("avatar", profile.avatar_url || profile.avatar || FALLBACK.profile.avatar);
    set("bio", profile.bio || FALLBACK.profile.bio);
    set("followers", profile.followers ?? FALLBACK.profile.followers);
    set("following", profile.following ?? FALLBACK.profile.following);
    set("name", profile.name || profile.login || SITE_CONFIG.name);
  }

  function fillRepos(repos) {
    const containers = document.querySelectorAll('[data-github="repos:list"]');
    if (!containers.length) return;

    const list = (repos || FALLBACK.repos).slice(0, 6);
    containers.forEach((container) => {
      // 保留容器自身样式，清空子项
      const template = container.querySelector("[data-repo-template]");
      if (template) template.remove();

      list.forEach((repo) => {
        const card = document.createElement("div");
        card.className = "gh-repo-card";
        card.setAttribute("data-repo", "");
        const name = repo.name || repo.full_name || "";
        const desc = repo.description || "";
        const stars = repo.stargazers_count ?? repo.stars ?? 0;
        const forks = repo.forks_count ?? repo.forks ?? 0;
        const lang = repo.language || "Java";
        const url = repo.html_url || repo.url || "#";
        card.innerHTML = `
          <a href="${url}" target="_blank" rel="noopener" class="gh-repo-name">${name}</a>
          <p class="gh-repo-desc">${desc}</p>
          <div class="gh-repo-meta">
            <span class="gh-repo-lang"><span class="gh-lang-dot"></span>${lang}</span>
            <span class="gh-repo-stars">★ ${stars}</span>
            <span class="gh-repo-forks">⑂ ${forks}</span>
          </div>
        `;
        container.appendChild(card);
      });
      container.classList.add("gh-loaded");
    });
  }

  function fillActivity(activity) {
    const containers = document.querySelectorAll('[data-github="activity:list"]');
    if (!containers.length) return;

    const list = activity || FALLBACK.activity;
    containers.forEach((container) => {
      const template = container.querySelector("[data-activity-template]");
      if (template) template.remove();

      list.forEach((item) => {
        const el = document.createElement("div");
        el.className = "gh-activity-item";
        el.setAttribute("data-activity", "");
        el.style.setProperty("--gh-color", item.color || "#64748b");
        el.innerHTML = `
          <div class="gh-activity-dot"></div>
          <div class="gh-activity-body">
            <div class="gh-activity-action">${item.action}</div>
            <div class="gh-activity-desc">${item.desc}</div>
            <div class="gh-activity-time">${item.time}</div>
          </div>
        `;
        container.appendChild(el);
      });
      container.classList.add("gh-loaded");
    });
  }

  function fillBlog() {
    const posts = (window.SITE_CONFIG && window.SITE_CONFIG.blogPosts) || [];
    const containers = document.querySelectorAll('[data-github="blog:list"]');
    if (!containers.length) return;

    containers.forEach((container) => {
      const template = container.querySelector("[data-blog-template]");
      if (template) template.remove();

      posts.forEach((post) => {
        const el = document.createElement("article");
        el.className = "gh-blog-card";
        el.setAttribute("data-blog", "");
        if (post.placeholder) el.setAttribute("data-placeholder", "");
        el.innerHTML = `
          <div class="gh-blog-meta">
            <span class="gh-blog-date">${post.date}</span>
            <span class="gh-blog-time">${post.readTime}</span>
            <span class="gh-blog-cat">${post.category}</span>
          </div>
          <h3 class="gh-blog-title">${post.title}</h3>
          <p class="gh-blog-excerpt">${post.excerpt}</p>
          <a href="${post.url}" class="gh-blog-link">${post.placeholder ? "待撰写" : "阅读全文"} →</a>
        `;
        container.appendChild(el);
      });
      container.classList.add("gh-loaded");
    });
  }

  /* ---------- 加载状态管理 ---------- */
  function setLoading(isLoading) {
    document.body.classList.toggle("gh-loading", isLoading);
    document.querySelectorAll("[data-github]").forEach((el) => {
      if (isLoading) el.classList.add("gh-skeleton");
    });
  }

  function clearLoading() {
    document.body.classList.remove("gh-loading");
    document.querySelectorAll(".gh-skeleton").forEach((el) => el.classList.remove("gh-skeleton"));
  }

  /* ---------- 初始化入口 ---------- */
  async function init() {
    // 先填充博客（本地数据，无需等待）
    fillBlog();

    setLoading(true);
    try {
      const data = await fetchAll();
      fillStat("contributions", data.stats.contributions);
      fillStat("streak", data.stats.streak);
      fillStat("stars", data.stats.stars);
      fillStat("repos", data.stats.repos);
      fillProfile(data.profile);
      fillRepos(data.repos);
      fillActivity(data.activity);
    } catch (err) {
      // 全部失败时使用降级数据
      console.warn("[GitHubAPI] 使用降级数据:", err.message);
      const fb = FALLBACK;
      fillStat("contributions", fb.stats.contributions);
      fillStat("streak", fb.stats.streak);
      fillStat("stars", fb.stats.stars);
      fillStat("repos", fb.stats.repos);
      fillProfile(fb.profile);
      fillRepos(fb.repos);
      fillActivity(fb.activity);
    } finally {
      clearLoading();
    }
  }

  return { init, fetchAll, computeStats, parseActivity };
})();

window.GitHubAPI = GitHubAPI;
