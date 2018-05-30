(function ($) {
    'use strict';

    $('.lazyImg').Lazy({
        afterLoad: function(elem) {
            elem.addClass('lazyImg-loaded');
        }
    });

})(jQuery);