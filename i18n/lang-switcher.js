/**
 * Language Switcher UI Component
 * ============================================================
 * Injects a floating language selector into each page.
 * Positioned top-right (fixed), responsive (collapses on mobile).
 * Styled via CSS custom properties so each theme can override.
 *
 * Usage:
 *   LangSwitcher.mount();  // call after I18n.init() on DOMContentLoaded
 *   LangSwitcher.update(); // refresh selection state (auto-called on languagechange)
 */
(function () {
  'use strict';

  var MOUNTED_ID = 'i18n-lang-switcher';
  var mounted = false;

  function getLabel(lang) {
    var labels = {
      'en': 'EN',
      'zh-CN': '简',
      'zh-TW': '繁'
    };
    return labels[lang] || lang;
  }

  function getFullLabel(lang) {
    var key = 'langSwitcher.' + lang;
    var val = window.I18n ? window.I18n.t(key) : lang;
    return (val === key) ? lang : val;
  }

  function buildCSS() {
    return ''
      + '#' + MOUNTED_ID + '{'
      +   'position:fixed;top:16px;right:16px;z-index:9998;'
      +   'display:flex;align-items:center;gap:4px;'
      +   'padding:4px;'
      +   'border-radius:999px;'
      +   'background:var(--i18n-bg,rgba(0,0,0,0.5));'
      +   'border:1px solid var(--i18n-border,rgba(255,255,255,0.15));'
      +   'backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);'
      +   'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;'
      +   'font-size:12px;'
      +   'user-select:none;'
      +   'box-shadow:0 2px 12px var(--i18n-shadow,rgba(0,0,0,0.2));'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-btn{'
      +   'padding:4px 10px;border:none;background:transparent;'
      +   'color:var(--i18n-text,rgba(255,255,255,0.6));'
      +   'font-size:12px;font-weight:600;cursor:pointer;'
      +   'border-radius:999px;transition:all 0.2s;'
      +   'line-height:1.4;letter-spacing:0.5px;'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-btn:hover{'
      +   'color:var(--i18n-text-hover,#fff);'
      +   'background:var(--i18n-hover,rgba(255,255,255,0.1));'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-btn.active{'
      +   'color:var(--i18n-active-text,#fff);'
      +   'background:var(--i18n-active-bg,rgba(255,255,255,0.18));'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-globe{'
      +   'display:none;'
      +   'padding:4px 8px;'
      +   'color:var(--i18n-text,rgba(255,255,255,0.6));'
      +   'cursor:pointer;'
      +   'font-size:14px;'
      + '}'
      + '@media(max-width:640px){'
      +   '#' + MOUNTED_ID + '{'
      +     'top:8px;right:8px;'
      +     'padding:2px;'
      +   '}'
      +   '#' + MOUNTED_ID + ' .i18n-btn{padding:3px 7px;font-size:11px;}'
      +   '#' + MOUNTED_ID + '.collapsed .i18n-btn{display:none;}'
      +   '#' + MOUNTED_ID + '.collapsed .i18n-globe{display:block;}'
      +   '#' + MOUNTED_ID + '.expanded .i18n-globe{display:none;}'
      +   '#' + MOUNTED_ID + '.expanded .i18n-btn{display:block;}'
      + '}';
  }

  function injectStyles() {
    if (document.getElementById(MOUNTED_ID + '-styles')) return;
    var style = document.createElement('style');
    style.id = MOUNTED_ID + '-styles';
    style.textContent = buildCSS();
    document.head.appendChild(style);
  }

  function buildSwitcher() {
    var container = document.createElement('div');
    container.id = MOUNTED_ID;
    container.className = 'collapsed';

    var globe = document.createElement('span');
    globe.className = 'i18n-globe';
    globe.textContent = '\u25C9'; // circle with dot
    globe.setAttribute('aria-label', 'Language');
    globe.setAttribute('role', 'button');
    globe.setAttribute('tabindex', '0');
    container.appendChild(globe);

    var supported = window.I18n ? window.I18n.getSupported() : ['en'];
    var current = window.I18n ? window.I18n.getLang() : 'en';

    supported.forEach(function (lang) {
      var btn = document.createElement('button');
      btn.className = 'i18n-btn' + (lang === current ? ' active' : '');
      btn.setAttribute('data-lang', lang);
      btn.setAttribute('type', 'button');
      btn.setAttribute('title', getFullLabel(lang));
      btn.textContent = getLabel(lang);
      btn.addEventListener('click', function () {
        if (window.I18n) window.I18n.setLang(lang);
        // collapse on mobile after selection
        container.className = 'collapsed';
      });
      container.appendChild(btn);
    });

    // toggle expand/collapse on mobile
    globe.addEventListener('click', function () {
      container.className = (container.className === 'collapsed') ? 'expanded' : 'collapsed';
    });
    globe.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        container.className = (container.className === 'collapsed') ? 'expanded' : 'collapsed';
      }
    });

    return container;
  }

  function mount() {
    if (mounted) return;
    if (!window.I18n) return;
    injectStyles();
    var el = buildSwitcher();
    document.body.appendChild(el);
    mounted = true;

    // refresh active state on language change
    window.addEventListener('languagechange', function () {
      update();
    });
  }

  function update() {
    var container = document.getElementById(MOUNTED_ID);
    if (!container || !window.I18n) return;
    var current = window.I18n.getLang();
    container.querySelectorAll('.i18n-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === current;
      btn.classList.toggle('active', isActive);
    });
  }

  window.LangSwitcher = {
    mount: mount,
    update: update
  };
})();
