/**
 * Language Switcher UI Component
 * ============================================================
 * YouTube-style language dropdown with auto-collapse.
 * Mounted inside a .gh-nav-cluster wrapper alongside the back button.
 * Both buttons share unified glass style and linked hover-expand.
 *
 * Usage:
 *   LangSwitcher.mount();  // call after I18n.init() on DOMContentLoaded
 *   LangSwitcher.update(); // refresh selection state (auto-called on languagechange)
 */
(function () {
  'use strict';

  var MOUNTED_ID = 'i18n-lang-switcher';
  var CLUSTER_CLASS = 'gh-nav-cluster';
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
      /* Lang switcher container: relative inside .gh-nav-cluster flex wrapper */
      + '#' + MOUNTED_ID + '{'
      +   'position:relative;'
      +   'user-select:none;'
      +   '-webkit-tap-highlight-color:transparent;'
      + '}'
      /* Globe trigger button — shares same glass style as .gh-back-hub */
      + '#' + MOUNTED_ID + ' .i18n-trigger{'
      +   'display:flex;align-items:center;gap:0;'
      +   'padding:8px 10px;'
      +   'border-radius:999px;'
      +   'background:rgba(255,255,255,0.12);'
      +   'border:1px solid rgba(255,255,255,0.18);'
      +   'backdrop-filter:blur(20px) saturate(180%);'
      +   '-webkit-backdrop-filter:blur(20px) saturate(180%);'
      +   'color:rgba(255,255,255,0.85);'
      +   'font-size:13px;font-weight:600;'
      +   'cursor:pointer;'
      +   'transition:all 0.3s cubic-bezier(0.4,0,0.2,1);'
      +   'box-shadow:0 2px 12px rgba(0,0,0,0.15);'
      +   'overflow:hidden;'
      +   'white-space:nowrap;'
      + '}'
      /* Expanded trigger: self hover, wrapper hover, or dropdown open */
      + '#' + MOUNTED_ID + ' .i18n-trigger:hover,'
      + '#' + MOUNTED_ID + ' .i18n-trigger:focus-within,'
      + '#' + MOUNTED_ID + '.open .i18n-trigger,'
      + '.' + CLUSTER_CLASS + ':hover #' + MOUNTED_ID + ' .i18n-trigger{'
      +   'padding:8px 14px;gap:6px;'
      +   'background:rgba(255,255,255,0.2);'
      +   'border-color:rgba(255,255,255,0.3);'
      +   'box-shadow:0 4px 16px rgba(0,0,0,0.2);'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-trigger svg{'
      +   'width:16px;height:16px;flex-shrink:0;'
      +   'transition:transform 0.25s ease;'
      + '}'
      + '#' + MOUNTED_ID + '.open .i18n-trigger svg.i18n-chevron{'
      +   'transform:rotate(180deg);'
      + '}'
      /* Collapsed: label and chevron hidden */
      + '#' + MOUNTED_ID + ' .i18n-current{'
      +   'font-weight:600;letter-spacing:0.3px;'
      +   'opacity:0;max-width:0;overflow:hidden;'
      +   'transition:opacity 0.3s ease,max-width 0.3s cubic-bezier(0.4,0,0.2,1);'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-chevron{'
      +   'opacity:0;max-width:0;overflow:hidden;'
      +   'transition:opacity 0.3s ease,max-width 0.3s cubic-bezier(0.4,0,0.2,1);'
      + '}'
      /* Expanded: label and chevron visible (self hover, wrapper hover, or open) */
      + '#' + MOUNTED_ID + ' .i18n-trigger:hover .i18n-current,'
      + '#' + MOUNTED_ID + ' .i18n-trigger:focus-within .i18n-current,'
      + '#' + MOUNTED_ID + '.open .i18n-current,'
      + '.' + CLUSTER_CLASS + ':hover #' + MOUNTED_ID + ' .i18n-current{'
      +   'opacity:1;max-width:60px;'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-trigger:hover .i18n-chevron,'
      + '#' + MOUNTED_ID + ' .i18n-trigger:focus-within .i18n-chevron,'
      + '#' + MOUNTED_ID + '.open .i18n-chevron,'
      + '.' + CLUSTER_CLASS + ':hover #' + MOUNTED_ID + ' .i18n-chevron{'
      +   'opacity:1;max-width:20px;'
      + '}'
      /* YouTube-style dropdown menu */
      + '#' + MOUNTED_ID + ' .i18n-menu{'
      +   'position:absolute;top:calc(100% + 8px);left:0;'
      +   'min-width:160px;'
      +   'padding:6px;'
      +   'border-radius:14px;'
      +   'background:rgba(30,30,30,0.85);'
      +   'border:1px solid rgba(255,255,255,0.12);'
      +   'backdrop-filter:blur(24px) saturate(180%);'
      +   '-webkit-backdrop-filter:blur(24px) saturate(180%);'
      +   'box-shadow:0 8px 32px rgba(0,0,0,0.3);'
      +   'opacity:0;visibility:hidden;'
      +   'transform:translateY(-8px) scale(0.96);'
      +   'transform-origin:top left;'
      +   'transition:all 0.2s cubic-bezier(0.4,0,0.2,1);'
      +   'pointer-events:none;'
      +   'z-index:9999;'
      + '}'
      + '#' + MOUNTED_ID + '.open .i18n-menu{'
      +   'opacity:1;visibility:visible;'
      +   'transform:translateY(0) scale(1);'
      +   'pointer-events:auto;'
      + '}'
      /* Menu items (no flags) */
      + '#' + MOUNTED_ID + ' .i18n-item{'
      +   'display:flex;align-items:center;gap:8px;'
      +   'padding:9px 12px;'
      +   'border-radius:8px;'
      +   'color:rgba(255,255,255,0.8);'
      +   'font-size:13px;font-weight:500;'
      +   'cursor:pointer;'
      +   'transition:background 0.15s,color 0.15s;'
      +   'white-space:nowrap;'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-item:hover{'
      +   'background:rgba(255,255,255,0.1);'
      +   'color:#fff;'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-item.active{'
      +   'color:#fff;'
      +   'font-weight:600;'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-item .i18n-check{'
      +   'margin-left:auto;'
      +   'width:16px;height:16px;'
      +   'opacity:0;'
      +   'transition:opacity 0.15s;'
      + '}'
      + '#' + MOUNTED_ID + ' .i18n-item.active .i18n-check{'
      +   'opacity:1;'
      + '}';
  }

  function injectStyles() {
    if (document.getElementById(MOUNTED_ID + '-styles')) return;
    var style = document.createElement('style');
    style.id = MOUNTED_ID + '-styles';
    style.textContent = buildCSS();
    document.head.appendChild(style);
  }

  var GLOBE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
  var CHEVRON_SVG = '<svg class="i18n-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  var CHECK_SVG = '<svg class="i18n-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function buildSwitcher() {
    var container = document.createElement('div');
    container.id = MOUNTED_ID;

    // Trigger button (globe + current label + chevron)
    var trigger = document.createElement('button');
    trigger.className = 'i18n-trigger';
    trigger.setAttribute('type', 'button');
    trigger.setAttribute('aria-label', 'Language');
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = GLOBE_SVG
      + '<span class="i18n-current">' + getLabel(window.I18n ? window.I18n.getLang() : 'en') + '</span>'
      + CHEVRON_SVG;
    container.appendChild(trigger);

    // Dropdown menu
    var menu = document.createElement('div');
    menu.className = 'i18n-menu';
    menu.setAttribute('role', 'menu');

    var supported = window.I18n ? window.I18n.getSupported() : ['en'];
    var current = window.I18n ? window.I18n.getLang() : 'en';

    supported.forEach(function (lang) {
      var item = document.createElement('div');
      item.className = 'i18n-item' + (lang === current ? ' active' : '');
      item.setAttribute('data-lang', lang);
      item.setAttribute('role', 'menuitem');
      item.setAttribute('tabindex', '0');
      item.innerHTML = '<span>' + getFullLabel(lang) + '</span>'
        + CHECK_SVG;
      item.addEventListener('click', function () {
        if (window.I18n) window.I18n.setLang(lang);
        closeMenu();
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (window.I18n) window.I18n.setLang(lang);
          closeMenu();
        }
      });
      menu.appendChild(item);
    });
    container.appendChild(menu);

    // Toggle menu on trigger click
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!container.contains(e.target)) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    var cluster = null;

    function toggleMenu() {
      container.classList.toggle('open');
      // Sync .open class on cluster for shared.css mobile rules
      if (cluster) cluster.classList.toggle('open', container.classList.contains('open'));
      trigger.setAttribute('aria-expanded', container.classList.contains('open'));
    }
    function closeMenu() {
      container.classList.remove('open');
      if (cluster) cluster.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    // Store cluster reference for menu toggle
    container._setCluster = function (c) { cluster = c; };

    return container;
  }

  function mount() {
    if (mounted) return;
    if (!window.I18n) return;
    injectStyles();

    var langEl = buildSwitcher();

    // Create or reuse .gh-nav-cluster wrapper
    var cluster = document.querySelector('.' + CLUSTER_CLASS);
    if (!cluster) {
      cluster = document.createElement('div');
      cluster.className = CLUSTER_CLASS;
      document.body.appendChild(cluster);
    }

    // Move existing back button into cluster (if present and not already inside)
    var backBtn = document.querySelector('.gh-back-hub');
    if (backBtn && backBtn.parentNode !== cluster) {
      cluster.appendChild(backBtn);
    }

    // Append lang switcher into cluster
    cluster.appendChild(langEl);

    // Give lang switcher a reference to the cluster for .open class syncing
    if (langEl._setCluster) langEl._setCluster(cluster);

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

    // Update current label
    var label = container.querySelector('.i18n-current');
    if (label) label.textContent = getLabel(current);

    // Update active item
    container.querySelectorAll('.i18n-item').forEach(function (item) {
      var isActive = item.getAttribute('data-lang') === current;
      item.classList.toggle('active', isActive);
    });
  }

  window.LangSwitcher = {
    mount: mount,
    update: update
  };
})();
