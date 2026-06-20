/**
 * GitHub API 集成模块
 * ============================================================
 * - 动态获取用户资料、仓库、活动数据
 * - localStorage 缓存（默认 10 分钟）
 * - 严格 API-only 模式：无降级兜底数据
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
  const USERNAME = (window.SITE_CONFIG && window.SITE_CONFIG.githubUsername) || "jessezen";

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

    // profile 必须成功，否则视为整体失败
    if (profile.status !== "fulfilled") {
      throw new Error(`Failed to fetch profile: ${profile.reason.message}`);
    }

    const data = {
      profile: profile.value,
      repos: repos.status === "fulfilled" ? repos.value : [],
      events: events.status === "fulfilled" ? events.value : [],
      online: true,
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
    return {
      contributions: 0, // GitHub API 不直接提供，留空
      streak: 0,
      stars: stars,
      repos: (data.profile && data.profile.public_repos) || repos.length,
    };
  }

  function parseActivity(events) {
    if (!events || !events.length) return [];

    const colorMap = {
      PushEvent: "#00f0ff",
      PullRequestEvent: "#a855f7",
      ReleaseEvent: "#22c55e",
      IssuesEvent: "#ec4899",
      CreateEvent: "#f59e0b",
      ForkEvent: "#06b6d4",
    };

    // i18n helper (falls back to English if I18n not loaded)
    function tr(key, params) {
      return (window.I18n && I18n.t) ? I18n.t(key, params) : fallbackTr(key, params);
    }
    function fallbackTr(key, params) {
      var dict = {
        'github.activity.pushed': 'Pushed to ${repo}',
        'github.activity.prMerged': 'PR merged in ${repo}',
        'github.activity.prOpened': 'PR opened in ${repo}',
        'github.activity.released': 'Released in ${repo}',
        'github.activity.issueAction': '${action} issue in ${repo}',
        'github.activity.created': 'Created ${ref_type} in ${repo}',
        'github.activity.default': '${type} in ${repo}',
        'github.activity.codeUpdate': 'code update',
        'github.activity.newRelease': 'new release'
      };
      var val = dict[key] || key;
      if (params) {
        Object.keys(params).forEach(function (k) {
          val = val.replace('${' + k + '}', params[k]);
        });
      }
      return val;
    }

    return events.slice(0, 6).map((e) => {
      const repo = e.repo ? e.repo.name.split("/").pop() : "";
      let action = "";
      let desc = "";
      switch (e.type) {
        case "PushEvent":
          action = tr('github.activity.pushed', { repo: repo });
          desc = (e.payload.commits || []).slice(0, 1).map((c) => c.message).join("") || tr('github.activity.codeUpdate');
          break;
        case "PullRequestEvent":
          action = e.payload.action === "closed"
            ? tr('github.activity.prMerged', { repo: repo })
            : tr('github.activity.prOpened', { repo: repo });
          desc = (e.payload.pull_request && e.payload.pull_request.title) || "";
          break;
        case "ReleaseEvent":
          action = tr('github.activity.released', { repo: repo });
          desc = (e.payload.release && e.payload.release.name) || tr('github.activity.newRelease');
          break;
        case "IssuesEvent":
          action = tr('github.activity.issueAction', { action: e.payload.action, repo: repo });
          desc = (e.payload.issue && e.payload.issue.title) || "";
          break;
        case "CreateEvent":
          action = tr('github.activity.created', { ref_type: e.payload.ref_type, repo: repo });
          desc = e.payload.ref || "";
          break;
        default:
          action = tr('github.activity.default', { type: e.type.replace("Event", ""), repo: repo });
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
    // Use Intl.RelativeTimeFormat via I18n when available
    if (window.I18n && I18n.formatRelativeTime) {
      return I18n.formatRelativeTime(dateStr);
    }
    // Fallback for when I18n is not loaded
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
      el.textContent = typeof val === "number" ? val.toLocaleString() : (val || "—");
      el.classList.add("gh-loaded");
    });
  }

  function fillProfile(profile) {
    const set = (key, val) => {
      document.querySelectorAll(`[data-github="profile:${key}"]`).forEach((el) => {
        if (key === "avatar") {
          el.src = val;
        } else {
          el.textContent = val || "";
        }
        el.classList.add("gh-loaded");
      });
    };
    set("avatar", profile.avatar_url || "");
    set("bio", profile.bio || "");
    set("followers", profile.followers ?? 0);
    set("following", profile.following ?? 0);
    set("name", profile.name || profile.login || (window.SITE_CONFIG && SITE_CONFIG.name) || "");
  }

  /* ---------- 通用克隆填充 ---------- */
  // 事件类型 → terminal-geek 的 commit 类型标签与 class
  const ACTIVITY_TYPE_MAP = {
    PushEvent: ["feat:", "type-feat"],
    PullRequestEvent: ["refactor:", "type-refactor"],
    ReleaseEvent: ["release:", "type-release"],
    IssuesEvent: ["fix:", "type-fix"],
    CreateEvent: ["chore:", "type-feat"],
    ForkEvent: ["fork:", "type-feat"],
  };

  function cloneAndFill(templateEl, data, index) {
    const clone = templateEl.cloneNode(true);
    clone.removeAttribute("data-repo-template");
    clone.removeAttribute("data-activity-template");
    clone.removeAttribute("data-blog-template");
    clone.removeAttribute("data-color-cycle");
    // 移除 reveal 动画类，避免动态插入的卡片因未被 IntersectionObserver 观察而隐藏
    clone.classList.remove("reveal");

    // 颜色循环修饰类
    const cycle = templateEl.getAttribute("data-color-cycle");
    if (cycle) {
      const classes = cycle.split(",").map((s) => s.trim()).filter(Boolean);
      classes.forEach((c) => clone.classList.remove(c));
      if (classes.length) clone.classList.add(classes[index % classes.length]);
    }

    // 按 data-field 填充
    clone.querySelectorAll("[data-field]").forEach((el) => {
      const field = el.getAttribute("data-field");
      if (field === "url") {
        const link = el.closest("a");
        if (link && data.url) link.setAttribute("href", data.url);
        return;
      }
      if (field === "index") {
        el.textContent = String(index + 1).padStart(2, "0");
        return;
      }
      if (field === "type") {
        const pair = ACTIVITY_TYPE_MAP[data.type] || ["feat:", "type-feat"];
        el.textContent = pair[0];
        el.classList.add(pair[1]);
        return;
      }
      if (field === "hash") {
        el.textContent = Math.random().toString(16).slice(2, 9);
        return;
      }
      if (data[field] !== undefined && data[field] !== null) {
        el.textContent = data[field];
      }
    });

    return clone;
  }

  function repoData(repo) {
    return {
      name: repo.name || repo.full_name || "",
      desc: repo.description || "",
      lang: repo.language || "",
      stars: repo.stargazers_count ?? repo.stars ?? 0,
      forks: repo.forks_count ?? repo.forks ?? 0,
      url: repo.html_url || repo.url || "#",
    };
  }

  function fillRepos(repos) {
    const containers = document.querySelectorAll('[data-github="repos:list"]');
    if (!containers.length) return;

    const list = (repos || []).slice(0, 6);
    containers.forEach((container) => {
      const template = container.querySelector("[data-repo-template]");
      if (!template) return;
      const templateClone = template.cloneNode(true);

      if (container.getAttribute("data-fill-mode") === "json") {
        // terminal-geek: <pre class="json"> 内重建 JSON 文本块
        container.innerHTML = "";
        const mkPunc = (t) => {
          const s = document.createElement("span");
          s.className = "punc";
          s.textContent = t;
          return s;
        };
        container.appendChild(mkPunc("["));
        container.appendChild(document.createTextNode("\n  "));
        list.forEach((repo, i) => {
          const node = cloneAndFill(templateClone, repoData(repo), i);
          container.appendChild(node);
          if (i < list.length - 1) {
            container.appendChild(mkPunc(","));
            container.appendChild(document.createTextNode("\n  "));
          } else {
            container.appendChild(document.createTextNode("\n"));
          }
        });
        container.appendChild(mkPunc("]"));
      } else {
        // 常规卡片克隆：保留模板的兄弟节点（如 section header），仅替换模板自身
        const parent = template.parentNode;
        template.remove();
        list.forEach((repo, i) => {
          parent.appendChild(cloneAndFill(templateClone, repoData(repo), i));
        });
      }
      container.classList.add("gh-loaded");
    });
  }

  function fillActivity(activity) {
    const containers = document.querySelectorAll('[data-github="activity:list"]');
    if (!containers.length) return;

    const list = activity || [];
    containers.forEach((container) => {
      const template = container.querySelector("[data-activity-template]");
      if (!template) return;
      const templateClone = template.cloneNode(true);
      const parent = template.parentNode;
      template.remove();

      list.forEach((item, i) => {
        const data = {
          type: item.type,
          action: item.action || "",
          desc: item.desc || "",
          time: item.time || "",
          repo: item.repo || "",
        };
        parent.appendChild(cloneAndFill(templateClone, data, i));
      });
      container.classList.add("gh-loaded");
    });
  }

  function fillBlog() {
    // Blog posts are now API-only — no local content.
    // Remove the template from DOM so the section stays empty.
    const containers = document.querySelectorAll('[data-github="blog:list"]');
    if (!containers.length) return;

    containers.forEach((container) => {
      const template = container.querySelector("[data-blog-template]");
      if (template) template.remove();
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

  /* ---------- 错误处理 ---------- */
  function showError(message) {
    // Remove any existing error banner
    const existing = document.querySelector('.gh-error-banner');
    if (existing) existing.remove();

    const banner = document.createElement('div');
    banner.className = 'gh-error-banner';
    banner.innerHTML = '<strong>GitHub API</strong> ' + (message || 'request failed');
    document.body.appendChild(banner);

    // Auto-dismiss after 8 seconds
    setTimeout(function () {
      if (banner.parentNode) banner.remove();
    }, 8000);
  }

  /* ---------- 初始化入口 ---------- */
  async function init() {
    // Blog section: no local data, just clean up templates
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
      // API-only mode: show error, no fallback data
      console.warn("[GitHubAPI] API request failed:", err.message);
      showError(err.message);
      // Clear loading state on stat elements
      document.querySelectorAll('[data-github^="stat:"]').forEach((el) => {
        el.textContent = "—";
        el.classList.add("gh-loaded");
      });
    } finally {
      clearLoading();
    }
  }

  return { init, fetchAll, computeStats, parseActivity };
})();

window.GitHubAPI = GitHubAPI;
