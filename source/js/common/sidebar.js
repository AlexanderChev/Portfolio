'use strict';
var sidebarBlog = (function () {
    var sidebar = $('.sidebar'),
        sidebarLink = sidebar.find('.sidebar__link');

    var init = function () {
        _setUpListners();
    };

    var _setUpListners = function () {
        sidebarLink.on('click', _scrollArticle);
        $(window).on('scroll', _moveSidebar);
    };

    var _scrollArticle = function (evt) {
        evt.preventDefault();
        var position = $(this).attr('href');

        $('html, body').stop().animate({
            scrollTop: $(position).offset().top
        }, 700, 'swing');
    };

    var _moveSidebar = function (evt) {
        var hSidebarTop = $('.blog__sidebar').offset().top,
            hScroll = $(window).scrollTop(),
            hSidebarBottom = $('.footer').offset().top - sidebar.outerHeight();

        $('.article').map(function (index, article) {
            var articleTop = $(article).offset().top - 100,
                currentId = $(article).attr('id');

            if (articleTop < hScroll) {
                sidebarLink
                    .removeClass('sidebar__link--active')
                    .filter('[href="#' + currentId + '"]')
                    .addClass('sidebar__link--active');
            }

            if (hScroll >= hSidebarBottom && $(window).width() > 768) {
                sidebar.css({'position': 'absolute', 'top': hSidebarBottom + 'px'});
            }else if (hScroll >= hSidebarTop && $(window).width() > 768) {
                sidebar.css({'position': 'fixed', 'top': 0 + 'px'}).addClass('sidebar--fixed');
            }else {
                sidebar.css({'position': 'relative'}).removeClass('sidebar--fixed');
                if ($(window).width() <= 768) {
                    sidebar.css({'position': 'fixed'});
                }
            }

            if ($(window).width() <= 768) {
                var swipeWidth = 100,
                    swipeStartX = 0,
                    swipeEndX = 0;

                $(window).on('touchstart', function (evt) {
                    var touch = evt.originalEvent.touches[0] || event.originalEvent.changedTouches[0],
                        swipeStartX = touch.pageX;
                });

                $(window).on('touchend', function (evt) {
                    var touch = evt.originalEvent.touches[0] || event.originalEvent.changedTouches[0],
                        swipeEndX = touch.pageX;

                    if (swipeEndX - swipeStartX > swipeWidth && !sidebar.hasClass('sidebar--active'))
                        sidebar.addClass('sidebar--active');
                    else if (swipeEndX - swipeStartX < -swipeWidth && sidebar.hasClass('sidebar--active'))
                        sidebar.removeClass('sidebar--active');
                });
            }
        });
    };

    return {
        init: init
    };
})();

if (loadScript('#page-blog')) {
   sidebarBlog.init();
}



