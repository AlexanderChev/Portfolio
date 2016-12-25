'use strict';
var menu = (function () {
    var toggle = $('.toggle'),
        menu = $('.menu'),
        list = $('.menu__list');

    var init = function () {
        _setUpListners();
    };

    var _setUpListners = function () {
        toggle.on('click', _showMenu);
        $(window).on('keydown', _closeMenu);
    };

    var _showMenu = function (evt) {
        evt.preventDefault();
        var delay = 0.2;

        $(this).toggleClass('toggle--active');
        menu.toggleClass('menu--active');

        if (menu.hasClass('menu--active')) {
            setTimeout(function () {
                list.toggleClass('menu__list--active');
                $('.menu__item').each(function (index) {
                    $(this).css('transition-delay', delay*index + 's')
                });
            }, 500);
        }
        list.removeClass('menu__list--active');
    };

    var _closeMenu = function (evt) {
        if(evt.keyCode == 27) {
            if (toggle.hasClass('toggle--active') && menu.hasClass('menu--active')) {
                toggle.removeClass('toggle--active');
                menu.removeClass('menu--active');
                list.removeClass('menu__list--active');
            }
        }
    };

    return {
        init: init
    };
})();

menu.init();