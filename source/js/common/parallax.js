var parallax = (function () {
    var layer = $('.parallax').find('.parallax__layer');

    layer.map(function (key, value) {
        var bottomPos = (window.innerHeight / 2) * (key / 100);

        $(value).css({
            'bottom': '-' + bottomPos + 'px',
            'transform': 'translate3d(0px, 0px, 0px)'
        });
    });

    return {
        init: function () {
            $(window).on('mousemove', function (evt) {
                var mouseX = evt.pageX,
                    mouseY = evt.pageY,
                    w = (window.innerWidth / 2 ) - mouseX,
                    h = (window.innerHeight / 2) - mouseY;

                layer.map(function (key, value) {
                    var widthPos = w * key / 100,
                        heightPos = h * key / 100,
                        bottomPos = (window.innerHeight / 2) * (key / 100);

                    $(value).css({
                        'bottom': '-' + bottomPos + 'px',
                        'transform': 'translate3d(' + widthPos + 'px,' + heightPos + 'px, 0)'
                    });
                });
            });
        }
    }

})();

parallax.init();