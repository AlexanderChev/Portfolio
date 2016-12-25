'use strict';
(function() {

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

    function toggleSlide() {
        //Скрытие активного слайда
        activeItemSlide.fadeOut(700);
        // //Появление требуемого слайда
        reqItemSlide.fadeIn(700);
        //Удаление класса у бывшего активного слайда
        activeItemSlide.removeClass('slider__works-item--active');
        //Добавление активного класса требуемому слайду
        reqItemSlide.addClass('slider__works-item--active');
        //Добавление требуемому описанию слайда активного класса
        reqItemDescr.addClass('slider__content-item--active');
        //Удаление класса у активного описания слайда
        activeItemDescr.removeClass('slider__content-item--active');
    }

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
        }, 300);
        activeItemUp.animate({
            'top' : '-100%'
        }, 300);

        toggleSlide();

        reqItemDown.animate({
            'top' : '0'
        }, 300, function() {
            activeItemDown.removeClass('slider__thumbnails-item--active').css('top', '-100%');
            reqItemDown.addClass('slider__thumbnails-item--active');
        });
        reqItemUp.animate({
            'top' : '0'
        }, 300, function() {
            activeItemUp.removeClass('slider__thumbnails-item--active').css('top', '100%');
            reqItemUp.addClass('slider__thumbnails-item--active');
        });
    });

    upBtn.on('click', function(evt) {
        evt.preventDefault();

        counterDown++;
        counterUp++;
        counterSlide++;

        toggleSlide();

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
        }, 300);
        activeItemUp.animate({
            'top' : '-100%'
        }, 300);

        toggleSlide();

        reqItemDown.animate({
            'top' : '0'
        }, 300, function() {
            activeItemDown.removeClass('slider__thumbnails-item--active').css('top', '-100%');
            reqItemDown.addClass('slider__thumbnails-item--active');
        });

        reqItemUp.animate({
            'top' : '0'
        }, 300, function() {
            activeItemUp.removeClass('slider__thumbnails-item--active').css('top', '100%');
            reqItemUp.addClass('slider__thumbnails-item--active');
        });
    });
}());