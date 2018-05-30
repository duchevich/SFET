(function ($) {
    'use strict';

    if ($('body').hasClass('act')) {

        var pageLoad = '#act-pageLoad',
            pageFade = '#act-pageFade',
            ofl = '#act-ofl';

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
                        $(ofl).attr('href', href);
                        $(ofl).fadeIn(_vars.transition_duration);
                        setTimeout(function() {
                            $(ofl).fadeOut(_vars.transition_duration)
                        }, 10000)
                    }
                }

                if (act === 'anchor') {
                    var top = $(href).offset().top;
                    $('body').animate({scrollTop: top}, _vars.transition_duration * 2)
                }
        });

    }

})(jQuery);