(function() {
    'use strict';

    //------ Flip -------//

    (function flip() {
        $(window).on('click keydown', function (evt) {
            var authBtn = $('.auth__btn'),
                flipWindow = $('.auth-window'),
                target = evt.target;

            if(target.classList.contains('auth__btn')) {
                evt.preventDefault();
                flipWindow.addClass('auth-window--flip');
                authBtn.animate({opacity: 0}, 400).css({'visibility': 'hidden'});
            } else {
                if(target.id === 'backflip' || !target.closest('.auth-window__signin') || evt.keyCode == 27)  {
                    flipWindow.removeClass('auth-window--flip');
                    authBtn.animate({opacity: 1}, 400).css({'visibility': 'visible'});
                }
            }
        });



    })();


})();