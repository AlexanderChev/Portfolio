'use strict';

var addPost = (function () {
    var _submitForm = function (evt) {
        evt.preventDefault();
        console.log('отправка');
        var form = $(this),
            url = '/admin/post',
            data = form.serialize();

        if (validate.validateForm(form)) {
            console.log(data);
            ajaxForm(data, url);
        }
    };

    return {
        init: function () {
            $('.admin__form-blog').on('submit', _submitForm);
        }
    }
})();

addPost.init();
