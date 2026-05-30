(function () {
    const STORAGE_KEY = 'tokifolio-lang';

    let currentLang = localStorage.getItem(STORAGE_KEY) ||
        (navigator.language.startsWith('ja') ? 'ja' : 'en');
    let translations = {};

    function getNested(obj, path) {
        return path.split('.').reduce(function (o, k) {
            return o && o[k] !== undefined ? o[k] : undefined;
        }, obj);
    }

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            var val = getNested(translations, key);
            if (val !== undefined) {
                el.textContent = val;
            }
        });

        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            var val = getNested(translations, key);
            if (val !== undefined) {
                el.innerHTML = val;
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            var val = getNested(translations, key);
            if (val !== undefined) {
                el.placeholder = val;
            }
        });

        document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-aria');
            var val = getNested(translations, key);
            if (val !== undefined) {
                el.setAttribute('aria-label', val);
            }
        });

        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && translations.meta && translations.meta.description) {
            metaDesc.content = translations.meta.description;
        }

        var ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && translations.meta && translations.meta.ogTitle) {
            ogTitle.content = translations.meta.ogTitle;
        }

        var ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && translations.meta && translations.meta.ogDescription) {
            ogDesc.content = translations.meta.ogDescription;
        }

        if (translations.meta && translations.meta.title) {
            document.title = translations.meta.title;
        }
    }

    function updateLangButtons() {
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            var isActive = btn.dataset.lang === currentLang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function loadLocale(lang) {
        return fetch('/locales/' + lang + '.json')
            .then(function (res) {
                if (!res.ok) {
                    throw new Error('Failed to load locale: ' + lang);
                }
                return res.json();
            })
            .then(function (data) {
                translations = data;
                currentLang = lang;
                localStorage.setItem(STORAGE_KEY, lang);
                document.documentElement.lang = lang;
                applyTranslations();
                updateLangButtons();
                document.dispatchEvent(new CustomEvent('localechange', {
                    detail: { lang: lang }
                }));
            });
    }

    function initLangSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                if (btn.dataset.lang !== currentLang) {
                    loadLocale(btn.dataset.lang);
                }
            });
        });
    }

    window.I18n = {
        getLang: function () {
            return currentLang;
        },
        t: function (key) {
            return getNested(translations, key);
        },
        loadLocale: loadLocale
    };

    document.addEventListener('DOMContentLoaded', function () {
        initLangSwitcher();
        loadLocale(currentLang);
    });
})();
