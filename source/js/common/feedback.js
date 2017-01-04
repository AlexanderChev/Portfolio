'use strict';

var feedback = (function () {
    var _submitForm = function (evt) {
        evt.preventDefault();
        console.log('отправка');
        var form = $(this).closest('.feedback__form'),
            url = '/mail',
            data = {
                name : form.find('input[name="name"]').val(),
                email : form.find('input[name="email"]').val(),
                text : form.find('textarea[name="text"]').val()
            };

        if (validate.validateForm(form)) {
            console.log(data);
            _ajaxForm(form, url);
        }
    };

    var _ajaxForm = function (data, url){
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            cache: false,
            data: data.serialize()
        }).done(function(response){
            if(response.error) {
                $.fancybox('<h1>' + response.error + '</h1>');
            }else  {
                $.fancybox('<h1>Сообщение отправлено</h1>');
            }
        }).fail(function(){
            $.fancybox('<h1>Ошибка соединения с сервером</h1>');
        });
    };

    return {
        init: function () {
            $('.feedback__btn--submit').on('click', _submitForm);
        }
    }
})();

feedback.init();
