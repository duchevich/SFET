(function ($) {
    'use strict';

    $('.lazyImg').Lazy({
        afterLoad: function(elem) {
            elem.addClass('is-in');
        }
    });

})(jQuery);