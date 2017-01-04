'use strict';
var slider = (function() {
    var downBtn = $(".slider__control-prev");
    var upBtn = $(".slider__control-next");
    var slide = $(".slider__display");
    var description = $(".slider__content");
    var counterDown = 0;
    var counterUp = 2;
    var counterSlide = 1;

    var itemsDown = downBtn.find('.slider__thumbnails-item'),
        itemsUp = upBtn.find('.slider__thumbnails-item'),
        itemsSlide = slide.find('.slider__works-item'),
        itemsDescr = description.find('.slider__content-item');

    function toggleSlide(activeSlide, reqSlide, activeDesc, reqDesc) {
        //Скрытие активного слайда
        activeSlide.fadeOut(700);
        // //Появление требуемого слайда
        reqSlide.fadeIn(700);
        //Удаление класса у бывшего активного слайда
        activeSlide.removeClass('slider__works-item--active');
        //Добавление активного класса требуемому слайду
        reqSlide.addClass('slider__works-item--active');
        //Добавление требуемому описанию слайда активного класса
        reqDesc.addClass('slider__content-item--active');
        //Удаление класса у активного описания слайда
        activeDesc.removeClass('slider__content-item--active');
    }

    return {
        init: function () {
            downBtn.on('click', function(evt) {
                evt.preventDefault();

                counterDown--;
                counterUp--;
                counterSlide--;

                var activeItemDown = downBtn.find('.slider__thumbnails-item--active'),
                    activeItemUp = upBtn.find('.slider__thumbnails-item--active'),
                    activeItemSlide = slide.find('.slider__works-item--active'),
                    activeItemDescr = description.find('.slider__content-item--active');

                if (counterDown < 0) counterDown = itemsDown.length-1;
                if (counterUp < 0) counterUp = itemsUp.length-1;
                if (counterSlide < 0) counterSlide = itemsUp.length-1;

                var reqItemDown = itemsDown.eq(counterDown),
                    reqItemUp = itemsUp.eq(counterUp),
                    reqItemSlide = itemsSlide.eq(counterSlide),
                    reqItemDescr = itemsDescr.eq(counterSlide);

                activeItemDown.animate({
                    'top': '100%'
                }, 200);
                activeItemUp.animate({
                    'top' : '-100%'
                }, 200);

                toggleSlide(activeItemSlide, reqItemSlide, activeItemDescr, reqItemDescr);

                reqItemDown.animate({
                    'top' : '0'
                }, 200, function() {
                    activeItemDown.removeClass('slider__thumbnails-item--active').css('top', '-100%');
                    reqItemDown.addClass('slider__thumbnails-item--active');
                });
                reqItemUp.animate({
                    'top' : '0'
                }, 200, function() {
                    activeItemUp.removeClass('slider__thumbnails-item--active').css('top', '100%');
                    reqItemUp.addClass('slider__thumbnails-item--active');
                });
            });

            upBtn.on('click', function(evt) {
                evt.preventDefault();

                counterDown++;
                counterUp++;
                counterSlide++;

                var activeItemDown = downBtn.find('.slider__thumbnails-item--active'),
                    activeItemUp = upBtn.find('.slider__thumbnails-item--active'),
                    activeItemSlide = slide.find('.slider__works-item--active'),
                    activeItemDescr = description.find('.slider__content-item--active');

                if (counterUp >= itemsUp.length) {
                    counterUp = 0;
                }
                if (counterDown >= itemsDown.length) counterDown = 0;
                if (counterSlide >= itemsDown.length) counterSlide = 0;

                var reqItemDown = itemsDown.eq(counterDown),
                    reqItemUp = itemsUp.eq(counterUp),
                    reqItemSlide = itemsSlide.eq(counterSlide),
                    reqItemDescr = itemsDescr.eq(counterSlide);

                activeItemDown.animate({
                    'top': '100%'
                }, 200);
                activeItemUp.animate({
                    'top' : '-100%'
                }, 200);

                toggleSlide(activeItemSlide, reqItemSlide, activeItemDescr, reqItemDescr);

                reqItemDown.animate({
                    'top' : '0'
                }, 200, function() {
                    activeItemDown.removeClass('slider__thumbnails-item--active').css('top', '-100%');
                    reqItemDown.addClass('slider__thumbnails-item--active');
                });

                reqItemUp.animate({
                    'top' : '0'
                }, 200, function() {
                    activeItemUp.removeClass('slider__thumbnails-item--active').css('top', '100%');
                    reqItemUp.addClass('slider__thumbnails-item--active');
                });
            });
        }
    }
}());

slider.init();