/**
 * Simplified Chinese (zh-CN) locale dictionary
 * 基于英文版本翻译为简体中文。
 */
window.I18nMessages = window.I18nMessages || {};
window.I18nMessages['zh-CN'] = {
  /* ===== 顶部状态 ===== */
  status: {
    available: "可邀约",
    online: "在线",
  },

  /* ===== 枢纽页 (index.html) ===== */
  hub: {
    title: "多元宇宙",
    tagline: "七个平行宇宙",
    loader: "正在初始化多元宇宙...",
    enter: "进入宇宙 →",
  },

  /* ===== 导航 ===== */
  nav: {
    back: "返回多元宇宙",
    home: "首页",
    stats: "统计",
    stack: "技术栈",
    projects: "项目",
    blog: "博客",
    activity: "动态",
    about: "关于",
    contact: "联系",
    interests: "兴趣",
    focus: "专注",
    log: "日志",
    hero: "英雄",
  },

  /* ===== 区块标题 ===== */
  section: {
    home: "首页",
    stats: "统计",
    systemStats: "系统统计",
    byTheNumbers: "数据一览",
    techStack: "技术栈",
    toolsOfTrade: "调用之器",
    projects: "项目",
    pinnedRepos: "精选仓库",
    featuredProjects: "精选项目",
    selectedWorks: "精选作品",
    shippedWork: "已交付",
    craftedWithCare: "倾心之作",
    blog: "博客",
    latestPosts: "最新文章",
    latestPostsShort: "最新文章",
    fieldNotes: "田野笔记",
    essaysFieldNotes: "随笔与杂记",
    notes: "随笔与笔记",
    activity: "动态",
    recentActivity: "最近活动",
    activityAtAGlance: "动态一览",
    activityTimeline: "动态时间线",
    activityStream: "动态流",
    dispatches: "动态信件",
    inkTraces: "近迹",
    interests: "兴趣",
    interestsFocus: "兴趣与专注",
    interestMatrix: "兴趣矩阵",
    thingsIDwellOn: "心所向之",
    about: "关于",
    aboutAuthor: "关于作者",
    toolingManifest: "工具清单",
  },

  /* ===== 统计标签 ===== */
  stats: {
    contributions: "贡献",
    contributionsUpper: "贡献",
    streak: "连续天数",
    currentStreak: "当前连续",
    currentStreakUpper: "当前连续",
    stars: "星标",
    starsEarned: "获取星标",
    starsEarnedUpper: "获取星标",
    repos: "仓库",
    repositories: "仓库",
    repositoriesUpper: "仓库",
    metric: "指标",
    value: "数值",
  },

  /* ===== 博客文章元数据标签 ===== */
  blog: {
    dateLabel: "日期:",
    readLabel: "阅读:",
    categoryLabel: "分类:",
  },

  /* ===== GitHub 动态内容 ===== */
  github: {
    activity: {
      pushed: "推送于 ${repo}",
      prMerged: "PR 已合并于 ${repo}",
      prOpened: "PR 已打开于 ${repo}",
      released: "发布于 ${repo}",
      issueAction: "${action} 议题于 ${repo}",
      created: "创建了 ${ref_type} 于 ${repo}",
      default: "${type} 于 ${repo}",
      codeUpdate: "代码更新",
      newRelease: "新版本",
    },
    timeAgo: {
      now: "刚刚",
      minutes: "${n} 分钟前",
      hours: "${n} 小时前",
      days: "${n} 天前",
      weeks: "${n} 周前",
    },
    typePrefix: {
      feat: "新功能:",
      refactor: "重构:",
      release: "发布:",
      fix: "修复:",
      chore: "杂务:",
      fork: "衍生:",
    },
    summary: "${repos} 个仓库 · 共 ${stars} ★ · 共 ${forks} ⑂ · 主要语言: ${lang}",
    lastSync: "# 最后同步: ${date} · 来源: github.com/${user}",
    sessionTerminated: "会话已终止。连接已关闭。",
    processExited: "[进程已退出，返回码 0]",
  },

  /* ===== 页脚 ===== */
  footer: {
    craftedWith: "制作于",
    onEarth: "于地球",
    endOfScroll: "— 已滚动至底部 —",
    inkRestraint: "以水墨与克制制作",
    glassCaffeine: "以玻璃与咖啡制作",
    tagline: "Java 后端开发者 · 行动胜过完美",
    inkMotto: "行胜于言 · 筑以致远",
  },

  /* ===== 个人身份 ===== */
  person: {
    role: "Java 后端开发者",
    location: "地球",
    quote: "行动胜过完美 — 边做边学。",
  },

  /* ===== 宇宙定义 ===== */
  universes: {
    "neon-cyber": {
      name: "霓虹赛博",
      desc: "暗黑赛博朋克 · 霓虹发光 · 渐变动画",
    },
    "terminal-geek": {
      name: "终端极客",
      desc: "CLI 终端模拟 · 打字机动画 · 磷光发光",
    },
    "brutalist": {
      name: "野兽工业",
      desc: "高对比粗犷 · 硬阴影 · 警示条纹",
    },
    "editorial": {
      name: "杂志编辑",
      desc: "优雅衬线 · 留白排版 · 首字下沉",
    },
    "glassmorphism": {
      name: "玻璃拟态",
      desc: "磨砂玻璃 · 动态渐变 · 浮动光球",
    },
    "retro-future": {
      name: "复古未来",
      desc: "80s 合成波 · 透视网格 · 铬合金文字",
    },
    "ink-minimal": {
      name: "极简水墨",
      desc: "东方水墨 · 竖排文字 · 朱砂印章",
    },
  },

  /* ===== 语言切换器 ===== */
  langSwitcher: {
    label: "语言",
    tooltip: "切换语言",
    en: "English",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
  },
};
