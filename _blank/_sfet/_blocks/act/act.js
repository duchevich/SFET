(function ($) {
    'use strict';

    if ($('body').hasClass('act')) {

        var pageLoad = '#act-pageLoad',
            pageFade = '#act-pageFade',
            ofl = '#act-ofl',
            ofl_timeout;

        $(pageLoad).fadeOut(_vars.transition_duration, function () {
            $(pageFade).fadeOut(_vars.transition_duration);
        });
        
        $(document).on('click', 'a[data-act]',function (e) {
            e.preventDefault();

            var link = $(this),
                act = link.data('act'),
                href = link.attr('href');

                if (act === 'pager') {
                    if (navigator.onLine || navigator.onLine === undefined) {
                        $(pageFade).fadeIn(_vars.transition_duration, function () {
                            window.location.href = href
                        });
                    } else {
                        clearTimeout(ofl_timeout);
                        $(ofl).attr('href', href);
                        $(ofl).fadeIn(_vars.transition_duration);
                        ofl_timeout = setTimeout(function() {
                            $(ofl).fadeOut(_vars.transition_duration)
                        }, 5000)
                    }
                }

                if (act === 'anchor') {
                    var top = $(href).offset().top;
                    $('html, body').animate({scrollTop: top}, _vars.transition_duration * 2)
                }
        });

    }

})(jQuery);