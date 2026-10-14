/* Eventos do Google Analytics (GA4) do Drivati.
   - click_whatsapp: clique em qualquer link do WhatsApp (botão flutuante ou página de contato).
   - generate_lead: envio do formulário de contato (evento recomendado do GA4 para leads).
   Os eventos só são enviados se o visitante aceitou os cookies: o gtag só existe
   depois do "Aceitar" (ver consent.js). Sem aceite, nada é enviado. */
(function () {
    function track(name, params) {
        if (!window.__gaLoaded || typeof window.gtag !== 'function') return;
        params = params || {};
        params.page_path = location.pathname;
        // "beacon" garante o envio mesmo quando a página muda logo em seguida (formulário, wa.me).
        params.transport_type = 'beacon';
        window.gtag('event', name, params);
    }

    document.addEventListener('click', function (e) {
        var a = e.target && e.target.closest ? e.target.closest('a[href*="wa.me"]') : null;
        if (a) track('click_whatsapp', { link_url: a.href });
    });

    document.addEventListener('submit', function (e) {
        var f = e.target;
        if (f && f.matches && f.matches('form[action*="formsubmit.co"]')) {
            track('generate_lead', { form_name: 'contato' });
        }
    });
})();
