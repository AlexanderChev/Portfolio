'use strict';
var validate = (function () {
    var init = function () {
        _setUpListeners();
    };

    var _setUpListeners = function () {
        $('form').on('keydown', '.form-error', _removeError);
        $('form').on('reset', _clearForm);
    };

    var _removeError = function (evt) {
        $(this).removeClass('form-error');
    };

    var _clearForm = function () {
        var form = $(this);
        form.find('.form-error').removeClass('form-error');
    };

    var validateForm = function (form) {
        var fields = form.find('input, textarea').not('input[type=file]', 'input[type=hidden]'),
            valid = true;
        console.log(form);
        fields.map(function (ndx, element) {
            var field = $(element),
                value = field.val();

            if ((field.attr('type') != "checkbox") &&
                (field.attr('type') != "radio") &&
                (value.length === 0) ) {
                field.addClass('form-error');
                $.fancybox('<h1>Вы заполнили не все поля формы!</h1>');
                valid = false;
            }
            console.log();
            if(form.hasClass('auth-window__form') && (!$('#captcha-human').prop('checked') || !$('#norobot-yes').prop('checked'))) {
                $.fancybox('<h1>Роботам тут не место</h1>');
                return valid = false;
            }

            if(field.attr('type') === 'email') {
                var pattern = /.+@.+\..+/i;
                valid = pattern.test(value);

                if (!valid) {
                    field.addClass('form-error');
                    $.fancybox('<h1>Введите корректный email!</h1>');
                    valid = false;
                }
            }

        });
        console.log(valid);

        return valid;
    };

    return {
        init: init,
        validateForm: validateForm
    }

})();

validate.init();