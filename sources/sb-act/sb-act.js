(function ($) {
    'use strict';

    if ($('.sb-act').length === 1) {

        const pageLoad = $('.sb-act-pageLoad'),
                pageFade = $('.sb-act-pageFade'),
                ofl = $('.sb-act-ofl');
        var ofl_timeout;

        pageLoad.fadeOut(_SV.TRD, function () {
            pageFade.fadeOut(_SV.TRD);
        });
        
        $(document).on('click', 'a[data-sb-act]',function (e) {
            e.preventDefault();

            const link = $(this),
                act = link.data('sb-act'),
                href = link.attr('href');

                if (act === 'pager') {
                    if (navigator.onLine || navigator.onLine === undefined) {
                        $(pageFade).fadeIn(_SV.TRD, function () {
                            window.location.href = href
                        });
                    } else {
                        clearTimeout(ofl_timeout);
                        ofl.attr('href', href);
                        ofl.fadeIn(_SV.TRD);
                        ofl_timeout = setTimeout(function() {
                            ofl.fadeOut(_SV.TRD)
                        }, 5000);
                    }
                }

                if (act === 'anchor') {
                    const top = $(href).offset().top;
                    $('html, body').animate({scrollTop: top}, _SV.TRD * 2)
                }
        });

    } else {
        console.error('Use 1 act block in page')
    }

})(jQuery);