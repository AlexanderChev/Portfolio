'use strict';
var parScroll = (function () {
    var background = $('.header__bg'),
        developer = $('.developer');

    return {
        move: function (block, windowScroll, amount) {
            var strafe = windowScroll / amount + '%',
                transformString = 'translate3d(0,' + strafe + ',0)';

            block.css('transform', transformString);
        },

        init: function (hScroll) {
            this.move(background,hScroll, 20);
            this.move(developer, hScroll, 30);
        }
    }

})();

$(window).on('scroll', function () {
    var hScroll = $(this).scrollTop();

    parScroll.init(hScroll)
});