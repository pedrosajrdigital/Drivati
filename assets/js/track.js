/* Eventos de conversão do Drivati no Google Analytics.
   Só dispara se o visitante aceitou os cookies (o gtag só existe depois do "Aceitar"). */
(function () {
    function send(name, params) {
        if (typeof window.gtag !== 'function' || window['ga-disable-G-536M7R5P2W']) return;
        params = params || {};
        params.page_path = location.pathname;
        params.transport_type = 'beacon';
        window.gtag('event', name, params);
    }

    function where(el) {
        if (el.closest('.wa-float')) return 'botao_flutuante';
        if (el.closest('footer')) return 'rodape';
        if (el.closest('header')) return 'menu';
        return 'conteudo';
    }

    document.addEventListener('click', function (e) {
        var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
        if (!a) return;
        var href = a.getAttribute('href') || '';

        if (href.indexOf('wa.me/') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
            send('whatsapp_click', { link_location: where(a) });
            send('generate_lead', { method: 'whatsapp' });
        } else if (href.indexOf('mailto:') === 0) {
            send('email_click', { link_location: where(a) });
        }
    });

    document.addEventListener('submit', function (e) {
        var f = e.target;
        if (f && f.tagName === 'FORM' && (f.getAttribute('action') || '').indexOf('formsubmit.co') !== -1) {
            send('form_submit', { form: 'contato' });
            send('generate_lead', { method: 'formulario' });
        }
    });
})();
