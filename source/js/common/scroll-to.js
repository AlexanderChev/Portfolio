'use strict';
var scrollTo = (function () {
    $('.arrow-link--down').click(function (evt) {
        evt.preventDefault();
        var position = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(position).offset().top
        }, 700, 'swing');
    });

    $('.arrow-link--up').click(function (evt) {
        evt.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 700, 'swing');
    });
})();