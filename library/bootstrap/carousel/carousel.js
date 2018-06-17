(function ($) {
    'use strict';

    $('.carousel').on('slide.bs.carousel', function (e) { // Animate height change for Carousel
        if ($(this).data('dynamicHeight') === true) {
            var nextHeight = $(e.relatedTarget).height();
            $(this).find('.carousel--item.is-active').parent().animate({height: nextHeight}, 500);
        }
    }).bcSwipe({ // Activate bcSwipe addition
        threshold: 50
    });
})(jQuery);