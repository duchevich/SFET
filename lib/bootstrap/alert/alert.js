(function ($) {
    'use strict';

    $('.alert--close').on('click', function () {
        var btn = $(this);
        if (btn.attr('data-dismiss') !== 'alert') {
            var alert = btn.parent();
            alert.fadeOut(150);
        }
    });
})(jQuery);