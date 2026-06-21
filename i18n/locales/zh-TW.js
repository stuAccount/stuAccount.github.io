/**
 * Traditional Chinese (zh-TW) locale dictionary
 * 基於英文版本翻譯為繁體中文。
 */
window.I18nMessages = window.I18nMessages || {};
window.I18nMessages['zh-TW'] = {
  /* ===== 頂部狀態 ===== */
  status: {
    available: "可邀約",
    online: "線上",
  },

  /* ===== 枢紐頁 (index.html) ===== */
  hub: {
    title: "多元宇宙",
    tagline: "七個平行宇宙",
    loader: "正在初始化多元宇宙...",
    enter: "進入宇宙 →",
  },

  /* ===== 導覽 ===== */
  nav: {
    back: "返回多元宇宙",
    home: "首頁",
    stats: "統計",
    stack: "技術棧",
    projects: "專案",
    blog: "部落格",
    activity: "動態",
    about: "關於",
    contact: "聯絡",
    interests: "興趣",
    focus: "專注",
    log: "日誌",
    hero: "英雄",
  },

  /* ===== 區塊標題 ===== */
  section: {
    home: "首頁",
    stats: "統計",
    systemStats: "系統統計",
    byTheNumbers: "數據一覽",
    techStack: "技術棧",
    toolsOfTrade: "呼叫之器",
    projects: "專案",
    pinnedRepos: "精選倉庫",
    featuredProjects: "精選專案",
    selectedWorks: "精選作品",
    shippedWork: "已交付",
    craftedWithCare: "傾心之作",
    blog: "部落格",
    latestPosts: "最新文章",
    latestPostsShort: "最新文章",
    fieldNotes: "田野筆記",
    essaysFieldNotes: "隨筆與雜記",
    notes: "隨筆與筆記",
    activity: "動態",
    recentActivity: "最近活動",
    activityAtAGlance: "動態一覽",
    activityTimeline: "動態時間線",
    activityStream: "動態流",
    dispatches: "動態信件",
    inkTraces: "近跡",
    interests: "興趣",
    interestsFocus: "興趣與專注",
    interestMatrix: "興趣矩陣",
    thingsIDwellOn: "心所向之",
    about: "關於",
    aboutAuthor: "關於作者",
    toolingManifest: "工具清單",
  },

  /* ===== 統計標籤 ===== */
  stats: {
    contributions: "貢獻",
    contributionsUpper: "貢獻",
    streak: "連續天數",
    currentStreak: "當前連續",
    currentStreakUpper: "當前連續",
    stars: "星標",
    starsEarned: "獲取星標",
    starsEarnedUpper: "獲取星標",
    forks: "Fork",
    forksUpper: "FORK",
    repos: "倉庫",
    repositories: "倉庫",
    repositoriesUpper: "倉庫",
    metric: "指標",
    value: "數值",
  },

  /* ===== 部落格文章元資料標籤 ===== */
  blog: {
    dateLabel: "日期:",
    readLabel: "閱讀:",
    categoryLabel: "分類:",
  },

  /* ===== GitHub 動態內容 ===== */
  github: {
    activity: {
      pushed: "推送於 ${repo}",
      prMerged: "PR 已合併於 ${repo}",
      prOpened: "PR 已開啟於 ${repo}",
      released: "發佈於 ${repo}",
      issueAction: "${action} 議題於 ${repo}",
      created: "建立了 ${ref_type} 於 ${repo}",
      default: "${type} 於 ${repo}",
      codeUpdate: "程式碼更新",
      newRelease: "新版本",
    },
    timeAgo: {
      now: "剛剛",
      minutes: "${n} 分鐘前",
      hours: "${n} 小時前",
      days: "${n} 天前",
      weeks: "${n} 週前",
    },
    typePrefix: {
      feat: "新功能:",
      refactor: "重構:",
      release: "發佈:",
      fix: "修復:",
      chore: "雜務:",
      fork: "衍生:",
    },
    summary: "${repos} 個倉庫 · 共 ${stars} ★ · 共 ${forks} ⑂ · 主要語言: ${lang}",
    lastSync: "# 最後同步: ${date} · 來源: github.com/${user}",
    sessionTerminated: "工作階段已終止。連線已關閉。",
    processExited: "[程序已退出，返回碼 0]",
    error: {
      apiError: "API接入異常",
      fetchFailed: "GitHub API 請求失敗: ${message}",
    },
  },

  /* ===== 頁尾 ===== */
  footer: {
    craftedWith: "製作於",
    onEarth: "於地球",
    endOfScroll: "— 已捲動至底部 —",
    inkRestraint: "以水墨與克制製作",
    glassCaffeine: "以玻璃與咖啡製作",
    tagline: "Java 後端開發者 · 行動勝過完美",
    inkMotto: "行勝於言 · 築以致遠",
  },

  /* ===== 個人身份 ===== */
  person: {
    role: "Java 後端開發者",
    location: "地球",
    quote: "行動勝過完美 — 邊做邊學。",
  },

  /* ===== 宇宙定義 ===== */
  universes: {
    "neon-cyber": {
      name: "霓虹賽博",
      desc: "暗黑賽博龐克 · 霓虹發光 · 漸變動畫",
    },
    "terminal-geek": {
      name: "終端極客",
      desc: "CLI 終端模擬 · 打字機動畫 · 磷光發光",
    },
    "brutalist": {
      name: "野獸工業",
      desc: "高對比粗獷 · 硬陰影 · 警示條紋",
    },
    "editorial": {
      name: "雜誌編輯",
      desc: "優雅襯線 · 留白排版 · 首字下沉",
    },
    "glassmorphism": {
      name: "玻璃擬態",
      desc: "磨砂玻璃 · 動態漸變 · 浮動光球",
    },
    "retro-future": {
      name: "復古未來",
      desc: "80s 合成波 · 透視網格 · 鉻合金文字",
    },
    "ink-minimal": {
      name: "極簡水墨",
      desc: "東方水墨 · 直排文字 · 朱砂印章",
    },
  },

  /* ===== 語言切換器 ===== */
  langSwitcher: {
    label: "語言",
    tooltip: "切換語言",
    en: "English",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
  },
};
