(function ($) {
    'use strict';

    if ($('.sb-act').length === 1) {

        const pageLoad = $('.b-act-pageLoad'),
                pageFade = $('.b-act-pageFade'),
                ofl = $('.b-act-ofl');
        var ofl_timeout;

        pageLoad.fadeOut(_G.TRD, function () {
            pageFade.fadeOut(_G.TRD);
        });
        
        $(document).on('click', 'a[data-b-act]',function (e) {
            e.preventDefault();

            const link = $(this),
                act = link.data('b-act'),
                href = link.attr('href');

                if (act === 'pager') {
                    if (navigator.onLine || navigator.onLine === undefined) {
                        $(pageFade).fadeIn(_G.TRD, function () {
                            window.location.href = href
                        });
                    } else {
                        clearTimeout(ofl_timeout);
                        ofl.attr('href', href);
                        ofl.fadeIn(_G.TRD);
                        ofl_timeout = setTimeout(function() {
                            ofl.fadeOut(_G.TRD)
                        }, 5000);
                    }
                }

                if (act === 'anchor') {
                    const top = $(href).offset().top;
                    $('html, body').animate({scrollTop: top}, _G.TRD * 2)
                }
        });

    } else {
        console.error('Use 1 act block in page')
    }

})(jQuery);