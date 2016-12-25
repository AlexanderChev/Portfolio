'use strict';
var auth = (function () {
    var _authorization = function (evt) {
        evt.preventDefault();
        var form = $(this).closest('#authorization'),
            url =  'auth.php';

        if (validate.validateForm(form)) {
            ajaxForm(form, url);
        }
    };

    return {
        init: function () {
            $('.auth-window__submit').on('click', _authorization);
        }
    }
})();

auth.init();