/**
 * I18n Runtime — vanilla JS internationalization for static sites
 * ============================================================
 * - Dictionaries loaded via <script> tags (window.I18nMessages)
 * - Locale detection: ?lang= URL param -> localStorage -> navigator.language -> 'en'
 * - DOM translation via [data-i18n], [data-i18n-attr], [data-i18n-html] attributes
 * - Intl API wrappers for date/number/relative-time formatting
 * - Dispatches 'languagechange' event when locale changes
 *
 * Usage:
 *   I18n.init();            // call on DOMContentLoaded
 *   I18n.t('nav.home');     // get translated string
 *   I18n.setLang('zh-CN');  // switch language at runtime
 *   I18n.applyToDOM();      // re-scan and translate all [data-i18n] elements
 */
(function () {
  'use strict';

  var SUPPORTED = ['en', 'zh-CN', 'zh-TW'];
  var DEFAULT_LANG = 'en';
  var STORAGE_KEY = 'lang';
  var URL_PARAM = 'lang';

  var currentLang = DEFAULT_LANG;
  var messages = (window.I18nMessages = window.I18nMessages || {});

  /* ---------- locale detection ---------- */
  function getQueryParam(name) {
    try {
      var match = new RegExp('[?&]' + name + '=([^&]+)').exec(window.location.search);
      return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
    } catch (e) {
      return null;
    }
  }

  function normalizeLang(lang) {
    if (!lang || typeof lang !== 'string') return null;
    lang = lang.trim();
    // exact match (e.g. "zh-CN")
    if (SUPPORTED.indexOf(lang) !== -1) return lang;
    // case-insensitive match
    var lower = lang.toLowerCase();
    for (var i = 0; i < SUPPORTED.length; i++) {
      if (SUPPORTED[i].toLowerCase() === lower) return SUPPORTED[i];
    }
    // prefix match (e.g. "zh" -> "zh-CN", "zh-Hans" -> "zh-CN")
    var prefix = lower.split('-')[0];
    for (var j = 0; j < SUPPORTED.length; j++) {
      if (SUPPORTED[j].toLowerCase().split('-')[0] === prefix) return SUPPORTED[j];
    }
    return null;
  }

  function detectLang() {
    // 1. URL query param
    var fromUrl = normalizeLang(getQueryParam(URL_PARAM));
    if (fromUrl) return fromUrl;
    // 2. localStorage
    try {
      var fromStorage = normalizeLang(localStorage.getItem(STORAGE_KEY));
      if (fromStorage) return fromStorage;
    } catch (e) {}
    // 3. navigator.language(s)
    if (navigator.languages && navigator.languages.length) {
      for (var i = 0; i < navigator.languages.length; i++) {
        var fromNav = normalizeLang(navigator.languages[i]);
        if (fromNav) return fromNav;
      }
    } else if (navigator.language) {
      var fromNavSingle = normalizeLang(navigator.language);
      if (fromNavSingle) return fromNavSingle;
    }
    // 4. default
    return DEFAULT_LANG;
  }

  /* ---------- core API ---------- */
  function getLang() { return currentLang; }
  function getSupported() { return SUPPORTED.slice(); }

  function getMessages(lang) {
    return messages[lang] || messages[DEFAULT_LANG] || {};
  }

  function lookup(key, lang) {
    var dict = getMessages(lang);
    var parts = key.split('.');
    var val = dict;
    for (var i = 0; i < parts.length; i++) {
      if (val == null || typeof val !== 'object') return undefined;
      val = val[parts[i]];
    }
    return (val === undefined) ? undefined : val;
  }

  function interpolate(str, params) {
    if (!params || typeof str !== 'string') return str;
    return str.replace(/\$\{(\w+)\}/g, function (_, name) {
      return (params[name] !== undefined && params[name] !== null) ? String(params[name]) : '${' + name + '}';
    });
  }

  function t(key, params) {
    var val = lookup(key, currentLang);
    if (val === undefined) {
      // fall back to English
      val = lookup(key, DEFAULT_LANG);
    }
    if (val === undefined) return key; // ultimate fallback: the key itself
    return interpolate(val, params);
  }

  function setLang(lang) {
    var normalized = normalizeLang(lang);
    if (!normalized || normalized === currentLang) return false;
    currentLang = normalized;

    // persist
    try { localStorage.setItem(STORAGE_KEY, normalized); } catch (e) {}

    // update <html lang>
    if (document.documentElement) {
      document.documentElement.lang = normalized;
    }

    // update URL query param without reload
    try {
      var url = new URL(window.location.href);
      url.searchParams.set(URL_PARAM, normalized);
      history.replaceState(null, '', url.toString());
    } catch (e) {}

    // re-apply translations to DOM
    applyToDOM();

    // notify listeners
    try {
      window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: normalized } }));
    } catch (e) {
      // CustomEvent may not be available in very old browsers
      var evt = document.createEvent('Event');
      evt.initEvent('languagechange', true, true);
      window.dispatchEvent(evt);
    }
    return true;
  }

  function init() {
    currentLang = detectLang();
    if (document.documentElement) {
      document.documentElement.lang = currentLang;
    }
    // persist the detected lang so subsequent pages read it
    try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) {}
    // apply translations once DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { applyToDOM(); });
    } else {
      applyToDOM();
    }
  }

  /* ---------- DOM translation ---------- */
  function applyToDOM(root) {
    var scope = root || document;
    if (!scope.querySelectorAll) return;

    // text content: [data-i18n="key"]
    scope.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      var val = t(key);
      el.textContent = val;
    });

    // innerHTML: [data-i18n-html="key"]
    scope.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (!key) return;
      var val = t(key);
      el.innerHTML = val;
    });

    // attributes: [data-i18n-attr="attr:key,attr2:key2"]
    scope.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr');
      if (!spec) return;
      spec.split(',').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length < 2) return;
        var attrName = parts[0].trim();
        var key = parts.slice(1).join(':').trim();
        el.setAttribute(attrName, t(key));
      });
    });
  }

  /* ---------- Intl formatters ---------- */
  function formatNumber(n) {
    if (typeof n !== 'number' || isNaN(n)) return String(n);
    try {
      return new Intl.NumberFormat(currentLang).format(n);
    } catch (e) {
      return String(n);
    }
  }

  function formatDate(date) {
    if (!date) return '';
    var d = (date instanceof Date) ? date : new Date(date);
    if (isNaN(d.getTime())) return '';
    try {
      return new Intl.DateTimeFormat(currentLang, {
        year: 'numeric', month: 'short', day: 'numeric'
      }).format(d);
    } catch (e) {
      return d.toISOString().slice(0, 10);
    }
  }

  function formatRelativeTime(date) {
    if (!date) return '';
    var d = (date instanceof Date) ? date : new Date(date);
    if (isNaN(d.getTime())) return '';
    var diffMs = d.getTime() - Date.now();
    var sec = Math.round(diffMs / 1000);
    var min = Math.round(sec / 60);
    var hr = Math.round(min / 60);
    var day = Math.round(hr / 24);
    var wk = Math.round(day / 7);

    // Use Intl.RelativeTimeFormat when available
    if (typeof Intl.RelativeTimeFormat === 'function') {
      var rtf = new Intl.RelativeTimeFormat(currentLang, { numeric: 'auto' });
      var absSec = Math.abs(sec), absMin = Math.abs(min), absHr = Math.abs(hr), absDay = Math.abs(day);
      if (absSec < 60) return rtf.format(sec, 'second');
      if (absMin < 60) return rtf.format(min, 'minute');
      if (absHr < 24) return rtf.format(hr, 'hour');
      if (absDay < 7) return rtf.format(day, 'day');
      return rtf.format(wk, 'week');
    }

    // Fallback for browsers without Intl.RelativeTimeFormat
    var absMin2 = Math.abs(min), absHr2 = Math.abs(hr), absDay2 = Math.abs(day);
    if (absMin2 < 1) return t('github.timeAgo.now');
    if (absMin2 < 60) return t('github.timeAgo.minutes', { n: Math.abs(min) });
    if (absHr2 < 24) return t('github.timeAgo.hours', { n: Math.abs(hr) });
    if (absDay2 < 7) return t('github.timeAgo.days', { n: Math.abs(day) });
    return t('github.timeAgo.weeks', { n: Math.abs(wk) });
  }

  /* ---------- public API ---------- */
  window.I18n = {
    SUPPORTED: SUPPORTED,
    init: init,
    t: t,
    setLang: setLang,
    getLang: getLang,
    getSupported: getSupported,
    applyToDOM: applyToDOM,
    formatNumber: formatNumber,
    formatDate: formatDate,
    formatRelativeTime: formatRelativeTime
  };
})();
