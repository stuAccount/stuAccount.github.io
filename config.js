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
  githubUsername: "jessezen",

  /* ===== 社交链接 ===== */
  social: {
    github: "https://github.com/jessezen",
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

  /* ===== 平行宇宙定义（枢纽页使用） ===== */
  universes: [
    {
      id: "neon-cyber",
      name: "霓虹赛博",
      nameEn: "Neon Cyber",
      names: { en: "Neon Cyber", "zh-CN": "霓虹赛博", "zh-TW": "霓虹賽博" },
      desc: "暗黑赛博朋克 · 霓虹发光 · 渐变动画",
      descs: { en: "Dark cyberpunk · Neon glow · Gradient animation", "zh-CN": "暗黑赛博朋克 · 霓虹发光 · 渐变动画", "zh-TW": "暗黑賽博龐克 · 霓虹發光 · 漸變動畫" },
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
      names: { en: "Terminal Geek", "zh-CN": "终端极客", "zh-TW": "終端極客" },
      desc: "CLI 终端模拟 · 打字机动画 · 磷光发光",
      descs: { en: "CLI terminal sim · Typewriter animation · Phosphor glow", "zh-CN": "CLI 终端模拟 · 打字机动画 · 磷光发光", "zh-TW": "CLI 終端模擬 · 打字機動畫 · 磷光發光" },
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
      names: { en: "Brutalist", "zh-CN": "野兽工业", "zh-TW": "野獸工業" },
      desc: "高对比粗犷 · 硬阴影 · 警示条纹",
      descs: { en: "High-contrast rugged · Hard shadows · Hazard stripes", "zh-CN": "高对比粗犷 · 硬阴影 · 警示条纹", "zh-TW": "高對比粗獷 · 硬陰影 · 警示條紋" },
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
      names: { en: "Editorial", "zh-CN": "杂志编辑", "zh-TW": "雜誌編輯" },
      desc: "优雅衬线 · 留白排版 · 首字下沉",
      descs: { en: "Elegant serif · Whitespace layout · Drop cap", "zh-CN": "优雅衬线 · 留白排版 · 首字下沉", "zh-TW": "優雅襯線 · 留白排版 · 首字下沉" },
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
      names: { en: "Glassmorphism", "zh-CN": "玻璃拟态", "zh-TW": "玻璃擬態" },
      desc: "磨砂玻璃 · 动态渐变 · 浮动光球",
      descs: { en: "Frosted glass · Dynamic gradient · Floating orbs", "zh-CN": "磨砂玻璃 · 动态渐变 · 浮动光球", "zh-TW": "磨砂玻璃 · 動態漸變 · 浮動光球" },
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
      names: { en: "Synthwave", "zh-CN": "复古未来", "zh-TW": "復古未來" },
      desc: "80s 合成波 · 透视网格 · 铬合金文字",
      descs: { en: "80s synthwave · Perspective grid · Chrome text", "zh-CN": "80s 合成波 · 透视网格 · 铬合金文字", "zh-TW": "80s 合成波 · 透視網格 · 鉻合金文字" },
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
      names: { en: "Ink Wash", "zh-CN": "极简水墨", "zh-TW": "極簡水墨" },
      desc: "东方水墨 · 竖排文字 · 朱砂印章",
      descs: { en: "Eastern ink · Vertical text · Cinnabar seal", "zh-CN": "东方水墨 · 竖排文字 · 朱砂印章", "zh-TW": "東方水墨 · 直排文字 · 朱砂印章" },
      colors: ["#f8f6f1", "#1a1a1a", "#c1272d"],
      bg: "#f8f6f1",
      characterImg: "3D cartoon character sprite sheet, three action poses of the same Chinese scholar arranged horizontally side by side left to right: LEFT pose idle standing holding ink brush, CENTER pose sweeping in with flowing hanfu robe dynamically, RIGHT pose turning away with robe flowing exit. Same character: traditional hanfu robe, ink brush. Identical outfit in all poses. Red seal accent. Rice paper texture background. Stylized 3D render. Full body each pose. Clean separation between poses.",
      characterImgActive: "3D cartoon character of a Chinese scholar dynamically wielding ink brush, hanfu robe flowing, black ink splashes trailing, red seal accent, rice paper texture background, stylized 3D render, full body",
      characterImgEnter: "3D cartoon character of a Chinese scholar sweeping in with flowing hanfu robe, ink brush trailing black ink splashes, dynamic entrance pose, red seal accent, rice paper texture background, stylized 3D render, full body",
      characterImgExit: "3D cartoon character of a Chinese scholar turning away with robe flowing, ink brush lowered, ink trail fading, graceful exit pose, red seal accent, rice paper texture background, stylized 3D render, full body",
      path: "./templates/ink-minimal.html",
    },
  ],

  /* ===== GitHub API 缓存时间（毫秒） ===== */
  cacheTTL: 1000 * 60 * 10, // 10 分钟
};

/* ---------- 本地化字段访问助手 ---------- */
// 单数→复数映射：name→names, desc→descs, bio→bios, action→actions, description→descriptions
var LOCALE_PLURAL_MAP = { name: 'names', desc: 'descs', bio: 'bios', action: 'actions', description: 'descriptions' };

function _resolvePath(root, path) {
  var parts = path.split('.');
  var cur = root;
  for (var i = 0; i < parts.length; i++) {
    if (cur == null) return undefined;
    cur = cur[parts[i]];
  }
  return cur;
}

/**
 * 本地化字段读取：优先返回当前 locale 对应的复数形式（如 names[lang]），
 * 找不到则回退到 en，再找不到则返回原始单数字段。
 *
 * @param {string} path - 点分路径，如 'universes.0.name' 或 'fallback.profile.bio'
 * @param {string} [locale] - 语言代码；缺省时取 I18n.getLang() 或 'en'
 * @returns {*} 解析后的值
 */
SITE_CONFIG.get = function (path, locale) {
  var lang = locale || (window.I18n && window.I18n.getLang ? window.I18n.getLang() : 'en');
  var parts = path.split('.');
  var lastPart = parts[parts.length - 1];
  var pluralKey = LOCALE_PLURAL_MAP[lastPart];

  if (pluralKey) {
    // 查找父节点上的复数字段（如 names/descs/bios/actions/descriptions）
    var parentPath = parts.length > 1 ? parts.slice(0, -1).join('.') : '';
    var parent = parentPath ? _resolvePath(this, parentPath) : this;
    if (parent && parent[pluralKey]) {
      var localized = parent[pluralKey][lang] || parent[pluralKey]['en'];
      if (localized !== undefined) return localized;
    }
  }

  // 回退：返回原始路径上的值
  return _resolvePath(this, path);
};

// 暴露为全局变量
window.SITE_CONFIG = SITE_CONFIG;
