'use strict';
var preloader = (function () {
    var percentsTotal = 1,
        preloader = $('.preloader');

    $(preloader).removeClass('preloader--nojs');

    var imgPath = $('*').map(function (index, element) {
        var background =  $(element).css('background-image'),
            img = $(element).is('img'),
            path = '';

        if (background != 'none') {
            path = background.replace('url("', '').replace('")', '');
        }

        if (img) {
            path = $(element).attr('src');
        }

        if (path) return path
    });

    var _setPercents = function (total, current) {
        var percents = Math.ceil(current / total * 100);

        $('.preloader__percents').text(percents + '%');

        if (percents>=100) {
            preloader.fadeOut();
        }
    };

    var _loadImages = function (images) {

        if (!images.length) preloader.fadeOut;

        images.forEach(function (img, i , images) {
            var fakeImages = $('<img>', {
                attr: {
                    src: img
                }
            });

            fakeImages.on('load error', function () {
                _setPercents(images.length, percentsTotal);
                percentsTotal++;
            });
        });
    };


    return {
        init: function () {
            var imgs = imgPath.toArray();
            _loadImages(imgs);
        }
    }
})();

$(function () {
    preloader.init();
});