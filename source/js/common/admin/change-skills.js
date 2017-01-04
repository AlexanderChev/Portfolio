'use strict';

var addPost = (function () {
    var _submitForm = function (evt) {
        evt.preventDefault();
        var form = $(this),
            url = '/admin/skills',
            data = form.serialize();

        if (validate.validateForm(form)) {
            console.log(data);
            ajaxForm(data, url);
        }
    };

    return {
        init: function () {
            $('.admin__form-skills').on('submit', _submitForm);
        }
    }
})();

addPost.init();
