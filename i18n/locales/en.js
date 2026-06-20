/**
 * English locale dictionary
 * ============================================================
 * To add a new language:
 *   1. Copy this file to {locale}.js
 *   2. Translate all string values
 *   3. Register the locale in i18n.js (I18n.SUPPORTED)
 *   4. Add a <script src> tag to all HTML pages
 *   5. Add an option to lang-switcher.js
 */
window.I18nMessages = window.I18nMessages || {};
window.I18nMessages['en'] = {
  /* ===== Top bar / status ===== */
  status: {
    available: "Available for hire",
    online: "ONLINE",
  },

  /* ===== Hub page (index.html) ===== */
  hub: {
    title: "MULTIVERSE",
    tagline: "Seven Parallel Universes",
    loader: "Initializing Multiverse...",
    enter: "Enter Universe →",
  },

  /* ===== Navigation ===== */
  nav: {
    back: "Back to Multiverse",
    home: "Home",
    stats: "Stats",
    stack: "Stack",
    projects: "Projects",
    blog: "Blog",
    activity: "Activity",
    about: "About",
    contact: "Contact",
    interests: "Interests",
    focus: "Focus",
    log: "Log",
    hero: "Hero",
  },

  /* ===== Section titles ===== */
  section: {
    home: "HOME",
    stats: "Stats",
    systemStats: "SYSTEM_STATS",
    byTheNumbers: "By the Numbers",
    techStack: "Tech Stack",
    toolsOfTrade: "Tools of the trade",
    projects: "Projects",
    pinnedRepos: "Pinned Repositories",
    featuredProjects: "Featured projects",
    selectedWorks: "Selected Works",
    shippedWork: "Shipped Work",
    craftedWithCare: "Crafted with care",
    blog: "Blog",
    latestPosts: "Latest Blog Posts",
    latestPostsShort: "Latest posts",
    fieldNotes: "Field Notes",
    essaysFieldNotes: "Essays & Field Notes",
    notes: "Notes & essays",
    activity: "Activity",
    recentActivity: "Recent Activity",
    activityAtAGlance: "Activity at a glance",
    activityTimeline: "Activity timeline",
    activityStream: "Activity Stream",
    dispatches: "Dispatches",
    inkTraces: "Ink traces of late",
    interests: "Interests",
    interestsFocus: "Interests & Focus Areas",
    interestMatrix: "Interest Matrix",
    thingsIDwellOn: "Things I dwell on",
    about: "About",
    aboutAuthor: "About the Author",
    toolingManifest: "Tooling Manifest",
  },

  /* ===== Stats labels ===== */
  stats: {
    contributions: "Contributions",
    contributionsUpper: "CONTRIBUTIONS",
    streak: "Day Streak",
    currentStreak: "Current Streak",
    currentStreakUpper: "CURRENT_STREAK",
    stars: "Stars",
    starsEarned: "Stars Earned",
    starsEarnedUpper: "STARS_EARNED",
    repos: "Repos",
    repositories: "Repositories",
    repositoriesUpper: "REPOSITORIES",
    metric: "METRIC",
    value: "VALUE",
  },

  /* ===== Blog post meta labels ===== */
  blog: {
    dateLabel: "date:",
    readLabel: "read:",
    categoryLabel: "category:",
  },

  /* ===== GitHub dynamic content ===== */
  github: {
    activity: {
      pushed: "Pushed to ${repo}",
      prMerged: "PR merged in ${repo}",
      prOpened: "PR opened in ${repo}",
      released: "Released in ${repo}",
      issueAction: "${action} issue in ${repo}",
      created: "Created ${ref_type} in ${repo}",
      default: "${type} in ${repo}",
      codeUpdate: "code update",
      newRelease: "new release",
    },
    timeAgo: {
      now: "just now",
      minutes: "${n}m ago",
      hours: "${n}h ago",
      days: "${n}d ago",
      weeks: "${n}w ago",
    },
    typePrefix: {
      feat: "feat:",
      refactor: "refactor:",
      release: "release:",
      fix: "fix:",
      chore: "chore:",
      fork: "fork:",
    },
    summary: "${repos} repositories · ${stars} ★ total · ${forks} ⑂ total · primary lang: ${lang}",
    lastSync: "# last sync: ${date} · source: github.com/${user}",
    sessionTerminated: "Session terminated. Connection closed.",
    processExited: "[process exited with code 0]",
  },

  /* ===== Footer ===== */
  footer: {
    craftedWith: "Crafted with",
    onEarth: "on Earth",
    endOfScroll: "— end of scroll —",
    inkRestraint: "Crafted with ink & restraint",
    glassCaffeine: "Crafted with glass & caffeine",
    tagline: "Java Backend Developer · Ship beats perfect",
    inkMotto: "行胜于言 · 筑以致远",
  },

  /* ===== Person role (config.js person fields) ===== */
  person: {
    role: "Java Backend Developer",
    location: "Earth",
    quote: "Ship beats perfect — learn by building.",
  },

  /* ===== Universes (hub HUD content) ===== */
  universes: {
    "neon-cyber": {
      name: "Neon Cyber",
      desc: "Dark cyberpunk · Neon glow · Gradient animation",
    },
    "terminal-geek": {
      name: "Terminal Geek",
      desc: "CLI terminal sim · Typewriter animation · Phosphor glow",
    },
    "brutalist": {
      name: "Brutalist",
      desc: "High-contrast rugged · Hard shadows · Hazard stripes",
    },
    "editorial": {
      name: "Editorial",
      desc: "Elegant serif · Whitespace layout · Drop cap",
    },
    "glassmorphism": {
      name: "Glassmorphism",
      desc: "Frosted glass · Dynamic gradient · Floating orbs",
    },
    "retro-future": {
      name: "Synthwave",
      desc: "80s synthwave · Perspective grid · Chrome text",
    },
    "ink-minimal": {
      name: "Ink Wash",
      desc: "Eastern ink · Vertical text · Cinnabar seal",
    },
  },

  /* ===== Language switcher ===== */
  langSwitcher: {
    label: "Language",
    tooltip: "Switch language",
    en: "English",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
  },
};
