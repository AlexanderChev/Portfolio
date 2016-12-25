var feedback = (function () {
    var _submitForm = function (evt) {
        evt.preventDefault();
        console.log('отправка');
        var form = $(this).closest('.feedback__form'),
            url = 'feedback.php';

        if (validate.validateForm(form)) {
            ajaxForm(form, url);
        }
    };

    return {
        init: function () {
            $('.feedback__btn--submit').on('click', _submitForm);
        }
    }
})();

feedback.init();
