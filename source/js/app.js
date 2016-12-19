(function() {
    'use strict';

    //------- Authorization --------//

    var auth = (function () {
        var form = $('#authorization');

        form.on('submit', function (evt) {
            evt.preventDefault();
            var form = $(this),
                userData = {
                    login: form.find('#login-field').val(),
                    password: form.find('#password-field').val(),
                    norobot: form.find('input[id=norobot-yes]:checked').val(),
                    human: form.find('input[id=captcha-human]:checked').val()
                };

            $.ajax({
                url:'',
                data: JSON.stringify(userData),
                type: 'POST',
                dataType: 'json'
            });
        });
    })();

    //--------- Valid form ----------//

    var validate = (function () {
        var init = function () {
            submitForm();
        };

        var submitForm = function () {
            $('form input[type=submit]').on('click', validateForm);
            $('form').on('keydown', '.error', removeError);
            $('form').on('reset', clearForm);
        };

        var removeError = function (evt) {
            $(this).removeClass('error');
        };

        var clearForm = function (form) {
            var form = $(this);
            form.find('input, textarea').trigger('hideTooltip');
            form.find('.error').removeClass('error');
        };

        var validateForm = function (evt) {
            evt.preventDefault();

            var form = $('form'),
                fields = form.find('input, textarea').not('input[type=file]', 'input[type=hidden]'),
                valid = true;

            fields.map(function (ndx, element) {
                var field = $(element),
                    value = field.val();

                if(value.length === 0) {
                    field.addClass('error');
                    alert('Вы заполнили не все поля формы!');
                    valid = false;
                }

                if(field.attr('type') === 'email') {
                    var pattern = /.+@.+\..+/i;
                    valid = pattern.test(value);

                    if (!valid) {
                        field.addClass('error');
                        valid = false;
                    }
                }

            });
            console.log(valid);
            return valid;
        };

        return {
            init: init
        }

    })();

    validate.init();














    //-------- Sidebar ----------//

    var sidebarBlog = (function () {
        var sidebar = $('.sidebar'),
            sidebarLink = sidebar.find('.sidebar__link');
        // При клике по ссылке в сайдбаре происходит анимация скролла до нужной статьи
        sidebarLink.on('click', function (evt) {
            evt.preventDefault();
            var position = $(this).attr('href');

            $('html, body').stop().animate({
                scrollTop: $(position).offset().top
            }, 700, 'swing');
        });
       // Перебирая объект с article вычисляем расстояние до статьи и берем идентификатор. Если соблюдено условие добавляем активный класс для ссылки и удаляем его у предыдущей
        $(window).scroll(function () {
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
                });
            // При скролле до сайдбара он становится фиксированным, а при достижении футера position: absolute(если ширина экрана больше 768px)
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
        });

        // Swipe. Тач события для планшета и телефона

        if ($(window).width() <= 768) {
            var swipeWidth = 100,
                swipeStartX = 0,
                swipeEndX = 0;

            $(window).on('touchstart', function (evt) {
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0],
                    swipeStartX = touch.pageX;
            });

            $(window).on('touchend', function (event) {
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0],
                    swipeEndX = touch.pageX;

                if (swipeEndX - swipeStartX > swipeWidth && !sidebar.hasClass('sidebar--active'))
                    sidebar.addClass('sidebar--active');
                else if (swipeEndX - swipeStartX < -swipeWidth && sidebar.hasClass('sidebar--active'))
                    sidebar.removeClass('sidebar--active');
            });
        }

    })();

    //-------- Preloader ------//

    var preloader = (function () {
        var percentsTotal = 1,
            preloader = $('.preloader');

        var imgPath = $('*').map(function (index, element) {
           var background =  $(element).css('background-image'),
               img = $(element).is('img'),
               path = '';

           if (background != 'none') {
               path = background.replace('url("', '').replace('")', '');
               console.log(path);
           }

           if (img) {
               path = $(element).attr('src');
           }

           if (path) return path
        });

        var setPercents = function (total, current) {
            var percents = Math.ceil(current / total * 100);

            $('.preloader__percents').text(percents + '%');

            if (percents>=100) {
                preloader.fadeOut();
            }
        };

        var loadImages = function (images) {

            if (!images.length) preloader.fadeOut;

            images.forEach(function (img, i , images) {
                 var fakeImages = $('<img>', {
                     attr: {
                        src: img
                     }
                 });

                 fakeImages.on('load error', function () {
                     setPercents(images.length, percentsTotal);
                     percentsTotal++;
                 });
            });
        };


        return {
            init: function () {
                var imgs = imgPath.toArray();
                loadImages(imgs);
            }
        }
    })();

    $(function () {
       preloader.init();
    });

    //------ Flip -------//

    var flip = (function () {
        $(window).on('click keydown', function (evt) {
            var authBtn = $('.auth__btn'),
                flipWindow = $('.auth-window'),
                target = evt.target;

            if (target.classList.contains('auth__btn')) {
                evt.preventDefault();
                flipWindow.addClass('auth-window--flip');
                authBtn.animate({opacity: 0}, 400).css({'visibility': 'hidden'});
            } else {
                if (target.id === 'backflip' || !target.closest('.auth-window__signin') || evt.keyCode === 27)  {
                    flipWindow.removeClass('auth-window--flip');
                    authBtn.animate({opacity: 1}, 400).css({'visibility': 'visible'});
                }
            }
        });
    })();

    //---------- Parallax ----------//

    // var parallax = (function () {
    //     var layer = $('.parallax').find('.parallax__layer');
    //
    //     layer.map(function (key, value) {
    //         var bottomPos = (window.innerHeight / 2) * (key / 100);
    //
    //         $(value).css({
    //             // 'bottom': '-' + bottomPos + 'px',
    //             'transform': 'translate3d(0px, 0px, 0px)'
    //         });
    //     });
    //
    //     $(window).on('mousemove', function (evt) {
    //         var mouseX = evt.pageX,
    //             mouseY = evt.pageY,
    //             w = (window.innerWidth / 2 ) - mouseX,
    //             h = (window.innerHeight / 2) - mouseY;
    //
    //         layer.map(function (key, value) {
    //             var widthPos = w * key / 100,
    //                 heightPos = h * key / 100,
    //                 bottomPos = (window.innerHeight / 2) * (key / 100);
    //
    //             $(value).css({
    //                 // 'bottom': '-' + bottomPos + 'px',
    //                 'transform': 'translate3d(' + widthPos + 'px,' + heightPos + 'px, 0)'
    //             });
    //         });
    //     });
    //
    // })();
    //

    //----- Main menu --------//

    var menu = (function () {
        var toggle = $('.toggle'),
            menu = $('.menu'),
            list = $('.menu__list');

        toggle.on('click', function (evt) {
            var delay = 0.2;
            evt.preventDefault();
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
        });

        $(window).on('keydown', function (evt) {
            if(evt.keyCode == 27) {
                if (toggle.hasClass('toggle--active') && menu.hasClass('menu--active')) {
                    toggle.removeClass('toggle--active');
                    menu.removeClass('menu--active');
                    list.removeClass('menu__list--active');
                }
            }
        });
    })();

    //--------- Scroll-to ----------//

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

    //-------- Blur -------//

    var blur = (function () {
        var bgBlur = $('.feedback__blur'),
            blurSection = $('.reviews');

        return {
            set: function () {
                var bgWidth = blurSection.width(),
                    posLeft = blurSection.offset().left - bgBlur.offset().left,
                    posTop = blurSection.offset().top - bgBlur.offset().top;

                if ( $(window).width()>1800){
                    $(bgBlur, blurSection).css('background-size', bgWidth + 'px');
                }

                bgBlur.css({
                    'background-position' : posLeft + 'px' + ' ' + posTop + 'px'
                });
            }
        }

    })();

    blur.set();

    $(window).resize(function () {
        blur.set();
    });

})();