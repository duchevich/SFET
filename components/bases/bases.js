(function ($) {
    'use strict';

    $(document).on('mousedown', 'img', function () {
        return false; // Disable dragging an image
    });
    $(document).on('click', 'a, button', function () {
        $(this).blur(); // Defocus links and buttons after click
    });

})(jQuery);