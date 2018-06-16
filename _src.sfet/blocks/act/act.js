(function ($) {
    'use strict';

    if ($('body').hasClass('act')) {

        var pageLoad = '#act-pageLoad',
            pageFade = '#act-pageFade',
            ofl = '#act-ofl',
            ofl_timeout;

        $(pageLoad).fadeOut(_v.trd, function () {
            $(pageFade).fadeOut(_v.trd);
        });
        
        $(document).on('click', 'a[data-act]',function (e) {
            e.preventDefault();

            var link = $(this),
                act = link.data('act'),
                href = link.attr('href');

                if (act === 'pager') {
                    if (navigator.onLine || navigator.onLine === undefined) {
                        $(pageFade).fadeIn(_v.trd, function () {
                            window.location.href = href
                        });
                    } else {
                        clearTimeout(ofl_timeout);
                        $(ofl).attr('href', href);
                        $(ofl).fadeIn(_v.trd);
                        ofl_timeout = setTimeout(function() {
                            $(ofl).fadeOut(_v.trd)
                        }, 5000)
                    }
                }

                if (act === 'anchor') {
                    var top = $(href).offset().top;
                    $('html, body').animate({scrollTop: top}, _v.trd * 2)
                }
        });

    }

})(jQuery);