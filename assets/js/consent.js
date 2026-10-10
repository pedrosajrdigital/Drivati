/* Aviso de cookies do Drivati: o Google Analytics só carrega depois do "Aceitar". */
(function () {
    var KEY = 'drivati_cookie_consent';
    var GA_ID = 'G-536M7R5P2W';
    var banner = null;

    function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
    function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

    function loadAnalytics() {
        if (window.__gaLoaded) return;
        window.__gaLoaded = true;
        window['ga-disable-' + GA_ID] = false;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        window.gtag('js', new Date());
        window.gtag('config', GA_ID);
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(s);
    }

    function stopAnalytics() {
        window['ga-disable-' + GA_ID] = true;
        var host = location.hostname.split('.');
        var domains = [location.hostname, '.' + location.hostname];
        if (host.length > 2) domains.push('.' + host.slice(-3).join('.'));
        if (host.length > 1) domains.push('.' + host.slice(-2).join('.'));
        document.cookie.split(';').forEach(function (c) {
            var name = c.split('=')[0].trim();
            if (name.indexOf('_ga') === 0) {
                domains.forEach(function (d) {
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
                });
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            }
        });
    }

    function hide() { if (banner) banner.classList.remove('is-visible'); }

    function decide(value) {
        save(value);
        if (value === 'accepted') loadAnalytics(); else stopAnalytics();
        hide();
    }

    function build() {
        banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', 'Aviso de cookies');
        banner.innerHTML =
            '<p>Este site usa cookies de estatística (Google Analytics) para entender o que funciona. ' +
            '<a href="politica-privacidade.html">Saiba mais</a></p>' +
            '<div class="cookie-actions">' +
            '<button type="button" class="cookie-btn" data-choice="declined">Recusar</button>' +
            '<button type="button" class="cookie-btn cookie-btn--primary" data-choice="accepted">Aceitar</button>' +
            '</div>';
        banner.addEventListener('click', function (e) {
            var c = e.target && e.target.getAttribute && e.target.getAttribute('data-choice');
            if (c) decide(c);
        });
        document.body.appendChild(banner);
    }

    function show() {
        if (!banner) build();
        window.setTimeout(function () { banner.classList.add('is-visible'); }, 50);
    }

    function init() {
        var saved = read();
        if (saved === 'accepted') loadAnalytics();
        else if (saved === 'declined') stopAnalytics();
        else window.setTimeout(show, 1200);

        document.addEventListener('click', function (e) {
            var t = e.target && e.target.closest ? e.target.closest('[data-cookie-prefs]') : null;
            if (t) { e.preventDefault(); show(); }
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
