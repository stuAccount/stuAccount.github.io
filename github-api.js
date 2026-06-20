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

  // Localize a fallback item's field via its plural sibling (action→actions, desc→descs)
  function localizedFallbackField(item, field) {
    var lang = (window.I18n && I18n.getLang) ? I18n.getLang() : 'en';
    var pluralKey = field + 's'; // action→actions, desc→descs
    if (item[pluralKey]) {
      var localized = item[pluralKey][lang] || item[pluralKey]['en'];
      if (localized !== undefined) return localized;
    }
    return item[field]; // legacy fallback
  }

  function parseActivity(events) {
    if (!events || !events.length) {
      // Localize fallback activity data
      return (FALLBACK.activity || []).map(function (item) {
        return {
          type: item.type,
          action: localizedFallbackField(item, 'action'),
          desc: localizedFallbackField(item, 'desc'),
          time: item.time || '',
          repo: item.repo || '',
          color: '#64748b',
        };
      });
    }

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
    // Localize bio if it comes from fallback (has 'bios' plural sibling)
    var bio;
    if (profile.bios) {
      bio = localizedFallbackField(profile, 'bio');
    } else {
      bio = profile.bio || (FALLBACK.profile ? localizedFallbackField(FALLBACK.profile, 'bio') : "");
    }
    set("bio", bio);
    set("followers", profile.followers ?? FALLBACK.profile.followers);
    set("following", profile.following ?? FALLBACK.profile.following);
    set("name", profile.name || profile.login || SITE_CONFIG.name);
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
    // Localize description if it comes from fallback (has 'descriptions' plural sibling)
    var desc;
    if (repo.descriptions) {
      desc = localizedFallbackField(repo, 'description');
    } else {
      desc = repo.description || "";
    }
    return {
      name: repo.name || repo.full_name || "",
      desc: desc,
      lang: repo.language || "Java",
      stars: repo.stargazers_count ?? repo.stars ?? 0,
      forks: repo.forks_count ?? repo.forks ?? 0,
      url: repo.html_url || repo.url || "#",
    };
  }

  function fillRepos(repos) {
    const containers = document.querySelectorAll('[data-github="repos:list"]');
    if (!containers.length) return;

    const list = (repos || FALLBACK.repos).slice(0, 6);
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

    const list = activity || FALLBACK.activity;
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
    const posts = (window.SITE_CONFIG && window.SITE_CONFIG.blogPosts) || [];
    const containers = document.querySelectorAll('[data-github="blog:list"]');
    if (!containers.length) return;

    containers.forEach((container) => {
      const template = container.querySelector("[data-blog-template]");
      if (!template) return;
      const templateClone = template.cloneNode(true);
      const parent = template.parentNode;
      template.remove();

      posts.forEach((post, i) => {
        const data = {
          title: post.title || "",
          excerpt: post.excerpt || "",
          date: post.date || "",
          readtime: post.readTime || "",
          category: post.category || "",
          url: post.url || "#",
        };
        parent.appendChild(cloneAndFill(templateClone, data, i));
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
