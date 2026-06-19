/**
 * 多元宇宙个人主页 - 全局配置
 * ============================================================
 * 修改此文件即可客制化所有平行空间的内容。
 * 所有模板页面和枢纽页均读取此配置。
 */

const SITE_CONFIG = {
  /* ===== 个人信息 ===== */
  name: "Jesse Zen",
  role: "Java Backend Developer",
  location: "Earth",
  quote: "Ship beats perfect — learn by building.",
  available: true, // 是否显示 "Available for hire" 徽章
  courtesyName: "志远", // 水墨风模板使用的表字

  /* ===== GitHub 配置 ===== */
  githubUsername: "stuAccount",

  /* ===== 社交链接 ===== */
  social: {
    github: "https://github.com/stuAccount",
    email: "",
    website: "",
  },

  /* ===== 技术栈 ===== */
  techStack: [
    { name: "Java", color: "#00f0ff" },
    { name: "Spring", color: "#22c55e" },
    { name: "Redis", color: "#ec4899" },
    { name: "MySQL", color: "#a855f7" },
    { name: "Python", color: "#00f0ff" },
    { name: "Docker", color: "#22c55e" },
    { name: "Linux", color: "#a855f7" },
    { name: "Git", color: "#ec4899" },
    { name: "Vim", color: "#00f0ff" },
    { name: "Nginx", color: "#22c55e" },
  ],

  /* ===== 兴趣聚焦 ===== */
  interests: [
    { name: "Backend Architecture", icon: "cpu" },
    { name: "AI Integration", icon: "sparkles" },
    { name: "Distributed Systems", icon: "globe" },
    { name: "LeetCode", icon: "code" },
    { name: "Vim", icon: "terminal" },
  ],

  /* ===== 博客文章（占位符，后续可替换为真实内容） ===== */
  blogPosts: [
    {
      title: "深入理解 Spring Boot 3 的自动配置机制",
      date: "2024-03-15",
      readTime: "8 min",
      category: "Spring Boot",
      excerpt: "Spring Boot 3 带来了全新的自动配置重构，基于 Jakarta EE 9+ 并引入了 @AutoConfiguration 注解。本文将深入源码，剖析自动配置的加载、条件过滤与排序机制……",
      url: "#", // 替换为真实文章链接
      placeholder: true,
    },
    {
      title: "Redis 分布式锁的几种实现方式对比",
      date: "2024-02-28",
      readTime: "12 min",
      category: "Redis",
      excerpt: "从 SETNX 到 Redlock，从单机到集群，分布式锁的实现方案百花齐放。本文对比五种主流方案的优缺点、适用场景及生产实践中的坑……",
      url: "#",
      placeholder: true,
    },
    {
      title: "从零搭建高可用微服务架构",
      date: "2024-02-10",
      readTime: "15 min",
      category: "Microservices",
      excerpt: "基于 Spring Cloud Alibaba 构建生产级微服务架构的完整指南。涵盖服务注册发现、配置中心、网关、熔断限流、链路追踪与分布式事务……",
      url: "#",
      placeholder: true,
    },
    {
      title: "JVM 调优实战：GC 日志分析指南",
      date: "2024-01-20",
      readTime: "10 min",
      category: "JVM",
      excerpt: "GC 日志是 JVM 调优的第一手资料。本文通过真实生产案例，演示如何使用 GCEasy、GCViewer 分析吞吐量、停顿时间与内存碎片……",
      url: "#",
      placeholder: true,
    },
  ],

  /* ===== 平行宇宙定义（枢纽页使用） ===== */
  universes: [
    {
      id: "neon-cyber",
      name: "霓虹赛博",
      nameEn: "Neon Cyber",
      desc: "暗黑赛博朋克 · 霓虹发光 · 渐变动画",
      colors: ["#00f0ff", "#a855f7", "#22c55e", "#ec4899"],
      bg: "#0a0a0f",
      characterImg: "3D cartoon character sprite sheet, three action poses of the same cyberpunk hacker arranged horizontally side by side left to right: LEFT pose idle standing confident with arms at sides, CENTER pose dynamic entrance leaping forward with energy trail, RIGHT pose turning away waving goodbye exit. Same character: neon cyan glowing jacket, futuristic visor, purple hair. Identical outfit in all poses. Dark cyberpunk city background. Vibrant neon colors. Stylized 3D render. Full body each pose. Clean separation between poses.",
      characterImgActive: "3D cartoon character of a cyberpunk hacker in dynamic action pose, punching forward with neon cyan energy fist, purple hair flowing, futuristic visor glowing, dark cyberpunk city background, vibrant neon colors, stylized 3D render, octane render, full body",
      characterImgEnter: "3D cartoon character of a cyberpunk hacker leaping forward dynamically, neon cyan energy trail behind, purple hair blowing, futuristic visor glowing bright, arms reaching forward, dark cyberpunk city background, vibrant neon colors, stylized 3D render, octane render, full body",
      characterImgExit: "3D cartoon character of a cyberpunk hacker stepping back waving goodbye, neon cyan jacket fading, purple hair settling, confident smile, dark cyberpunk city background, vibrant neon colors, stylized 3D render, octane render, full body",
      path: "./templates/neon-cyber.html",
    },
    {
      id: "terminal-geek",
      name: "终端极客",
      nameEn: "Terminal Geek",
      desc: "CLI 终端模拟 · 打字机动画 · 磷光发光",
      colors: ["#00ff41", "#000000", "#33ff33"],
      bg: "#000000",
      characterImg: "3D cartoon character sprite sheet, three action poses of the same retro programmer arranged horizontally side by side left to right: LEFT pose idle standing confident with arms at sides, CENTER pose sliding in dynamically on office chair, RIGHT pose turning away to face monitor waving hand. Same character: green terminal glow on face, round glasses, dark hoodie. Identical outfit in all poses. Black background with green code particles. Stylized 3D render. Full body each pose. Clean separation between poses.",
      characterImgActive: "3D cartoon character of a retro programmer turning around with confident smile, arms crossed, green terminal glow, round glasses reflecting code, dark hoodie, floating green code particles, black background, stylized 3D render, full body",
      characterImgEnter: "3D cartoon character of a retro programmer sliding in on office chair dynamically, green terminal code trailing, round glasses reflecting, dark hoodie flapping, excited expression, black background with green code particles, stylized 3D render, full body",
      characterImgExit: "3D cartoon character of a retro programmer turning away to face monitor, green terminal glow on back, round glasses visible from side, dark hoodie, waving hand, black background, stylized 3D render, full body",
      path: "./templates/terminal-geek.html",
    },
    {
      id: "brutalist",
      name: "野兽工业",
      nameEn: "Brutalist",
      desc: "高对比粗犷 · 硬阴影 · 警示条纹",
      colors: ["#000000", "#ffffff", "#ffd400", "#ff3b30"],
      bg: "#ffd400",
      characterImg: "3D cartoon character sprite sheet, three action poses of the same construction worker arranged horizontally side by side left to right: LEFT pose idle standing confident with arms at sides, CENTER pose crashing through wall dynamically with debris, RIGHT pose walking away carrying hammer on shoulder. Same character: yellow hard hat, strong geometric jaw, industrial overall. Identical outfit in all poses. Yellow and black hazard stripe background. Stylized 3D render. Full body each pose. Clean separation between poses.",
      characterImgActive: "3D cartoon character of a bold construction worker swinging a hammer, dynamic action pose, yellow hard hat, strong geometric jaw, industrial overall, yellow and black hazard stripe background, stylized 3D render, full body",
      characterImgEnter: "3D cartoon character of a bold construction worker crashing through wall dynamically, yellow hard hat flying slightly, debris flying, strong geometric jaw clenched, industrial overall, yellow and black hazard stripe background, stylized 3D render, full body",
      characterImgExit: "3D cartoon character of a construction worker walking away carrying hammer on shoulder, yellow hard hat, confident stride, back view turning, yellow and black hazard stripe background, stylized 3D render, full body",
      path: "./templates/brutalist.html",
    },
    {
      id: "editorial",
      name: "杂志编辑",
      nameEn: "Editorial",
      desc: "优雅衬线 · 留白排版 · 首字下沉",
      colors: ["#f5f2ed", "#1a1a1a", "#b8412c"],
      bg: "#f5f2ed",
      characterImg: "3D cartoon character sprite sheet, three action poses of the same elegant writer arranged horizontally side by side left to right: LEFT pose idle standing confident holding book, CENTER pose sweeping in with coat flying dynamically, RIGHT pose closing book and bowing farewell. Same character: vintage tweed suit, bow tie. Identical outfit in all poses. Warm cream paper background. Refined stylized 3D render. Full body each pose. Clean separation between poses.",
      characterImgActive: "3D cartoon character of an elegant writer turning a page with flourish, vintage tweed suit, bow tie, book open, sophisticated dynamic pose, warm cream paper background, refined stylized 3D render, full body",
      characterImgEnter: "3D cartoon character of an elegant writer sweeping in with coat flying, vintage tweed suit, bow tie, book in hand, dynamic graceful entrance pose, warm cream paper background with flying pages, refined stylized 3D render, full body",
      characterImgExit: "3D cartoon character of an elegant writer closing book and bowing farewell, vintage tweed suit, bow tie, sophisticated pose, warm cream paper background, refined stylized 3D render, full body",
      path: "./templates/editorial.html",
    },
    {
      id: "glassmorphism",
      name: "玻璃拟态",
      nameEn: "Glassmorphism",
      desc: "磨砂玻璃 · 动态渐变 · 浮动光球",
      colors: ["#667eea", "#764ba2", "#f093fb", "#00d4ff"],
      bg: "#764ba2",
      characterImg: "3D cartoon character sprite sheet, three action poses of the same ethereal crystal being arranged horizontally side by side left to right: LEFT pose idle floating with arms at sides, CENTER pose materializing from light particles dynamically, RIGHT pose dematerializing into light shards fading. Same character: translucent glass body, prismatic light refraction. Identical design in all poses. Purple blue gradient background. Stylized 3D render. Full body each pose. Clean separation between poses.",
      characterImgActive: "3D cartoon character of an ethereal crystal being spreading wings of glass, prismatic light refraction, dynamic floating pose with arms spread, purple blue gradient background, stylized 3D render, full body",
      characterImgEnter: "3D cartoon character of an ethereal crystal being materializing from light particles, translucent glass body forming, prismatic light refraction bursting, dynamic appearing pose, purple blue gradient background, stylized 3D render, full body",
      characterImgExit: "3D cartoon character of an ethereal crystal being dematerializing into light shards, translucent glass body dissolving, prismatic light scattering, fading pose, purple blue gradient background, stylized 3D render, full body",
      path: "./templates/glassmorphism.html",
    },
    {
      id: "retro-future",
      name: "复古未来",
      nameEn: "Synthwave",
      desc: "80s 合成波 · 透视网格 · 铬合金文字",
      colors: ["#2d1b69", "#ff006e", "#ff8c00", "#00f0ff"],
      bg: "#2d1b69",
      characterImg: "3D cartoon character sprite sheet, three action poses of the same 80s synthwave rocker arranged horizontally side by side left to right: LEFT pose idle standing confident with arms at sides, CENTER pose sliding in on neon grid dynamically, RIGHT pose walking into sunset silhouette fading. Same character: chrome metallic hair, neon pink sunglasses, leather jacket. Identical outfit in all poses. Sunset gradient background with grid. Retro futuristic stylized 3D render. Full body each pose. Clean separation between poses.",
      characterImgActive: "3D cartoon character of an 80s synthwave rocker playing electric guitar, chrome metallic hair flowing, neon pink sunglasses, leather jacket, dynamic rock star pose, sunset gradient background with grid, retro futuristic stylized 3D render, full body",
      characterImgEnter: "3D cartoon character of an 80s synthwave rocker sliding in on neon grid, chrome metallic hair flowing, neon pink sunglasses glowing, leather jacket, dynamic rock star entrance, sunset gradient background with grid, retro futuristic stylized 3D render, full body",
      characterImgExit: "3D cartoon character of an 80s synthwave rocker walking into sunset silhouette, chrome metallic hair backlit, neon pink sunglasses, leather jacket, fading pose, sunset gradient background, retro futuristic stylized 3D render, full body",
      path: "./templates/retro-future.html",
    },
    {
      id: "ink-minimal",
      name: "极简水墨",
      nameEn: "Ink Wash",
      desc: "东方水墨 · 竖排文字 · 朱砂印章",
      colors: ["#f8f6f1", "#1a1a1a", "#c1272d"],
      bg: "#f8f6f1",
      characterImg: "3D cartoon character sprite sheet, three action poses of the same Chinese scholar arranged horizontally side by side left to right: LEFT pose idle standing holding ink brush, CENTER pose sweeping in with flowing hanfu robe dynamically, RIGHT pose turning away with robe flowing exit. Same character: traditional hanfu robe, ink brush. Identical outfit in all poses. Red seal accent. Rice paper texture background. Stylized 3D render. Full body each pose. Clean separation between poses.",
      characterImgActive: "3D cartoon character of a Chinese scholar dynamically wielding ink brush, hanfu robe flowing, black ink splashes trailing, red seal accent, rice paper texture background, stylized 3D render, full body",
      characterImgEnter: "3D cartoon character of a Chinese scholar sweeping in with flowing hanfu robe, ink brush trailing black ink splashes, dynamic entrance pose, red seal accent, rice paper texture background, stylized 3D render, full body",
      characterImgExit: "3D cartoon character of a Chinese scholar turning away with robe flowing, ink brush lowered, ink trail fading, graceful exit pose, red seal accent, rice paper texture background, stylized 3D render, full body",
      path: "./templates/ink-minimal.html",
    },
  ],

  /* ===== 降级数据（GitHub API 不可用时使用） ===== */
  fallback: {
    profile: {
      avatar: "https://avatars.githubusercontent.com/u/0?v=4",
      bio: "Java Backend Developer",
      followers: 0,
      following: 0,
      publicRepos: 38,
    },
    stats: {
      contributions: 1247,
      streak: 42,
      stars: 312,
      repos: 38,
    },
    repos: [
      {
        name: "spring-cloud-gateway-pro",
        description: "Production-ready API gateway with rate limiting & auth",
        stars: 128,
        forks: 34,
        language: "Java",
        url: "https://github.com/stuAccount/spring-cloud-gateway-pro",
        updated: "2024-03-15",
      },
      {
        name: "distributed-task-scheduler",
        description: "Fault-tolerant distributed task scheduling framework",
        stars: 87,
        forks: 21,
        language: "Java",
        url: "https://github.com/stuAccount/distributed-task-scheduler",
        updated: "2024-02-28",
      },
      {
        name: "redis-cache-toolkit",
        description: "Smart caching utilities with Redis & Spring integration",
        stars: 54,
        forks: 12,
        language: "Java",
        url: "https://github.com/stuAccount/redis-cache-toolkit",
        updated: "2024-02-10",
      },
      {
        name: "leetcode-java-solutions",
        description: "300+ LeetCode solutions with detailed explanations",
        stars: 43,
        forks: 67,
        language: "Java",
        url: "https://github.com/stuAccount/leetcode-java-solutions",
        updated: "2024-01-20",
      },
    ],
    activity: [
      {
        type: "PushEvent",
        action: "Pushed to spring-cloud-gateway-pro",
        desc: "feat: add Redis caching layer to user service",
        time: "2h ago",
        repo: "spring-cloud-gateway-pro",
      },
      {
        type: "PullRequestEvent",
        action: "PR merged in distributed-task-scheduler",
        desc: "refactor: migrate payment module to Spring Boot 3",
        time: "1d ago",
        repo: "distributed-task-scheduler",
      },
      {
        type: "ReleaseEvent",
        action: "Released redis-cache-toolkit v2.1.0",
        desc: "Added smart invalidation and Lua scripting support",
        time: "3d ago",
        repo: "redis-cache-toolkit",
      },
      {
        type: "PushEvent",
        action: "Fixed critical bug in payment-service",
        desc: "resolve distributed lock race condition",
        time: "5d ago",
        repo: "payment-service",
      },
    ],
  },

  /* ===== GitHub API 缓存时间（毫秒） ===== */
  cacheTTL: 1000 * 60 * 10, // 10 分钟
};

// 暴露为全局变量
window.SITE_CONFIG = SITE_CONFIG;
