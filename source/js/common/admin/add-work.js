'use strict';

var addWork = (function () {
    var _submitForm = function (evt) {
        evt.preventDefault();
        var form = $(this),
            url = '/admin/work',
            data = new FormData(form[0]);

        if (validate.validateForm(form)) {
            console.log(data);
            _ajaxForm(data, url);
        }
    };

    var _ajaxForm = function (data, url) {
        $.ajax({
            type: "POST",
            url: url,
            processData: false,
            contentType: false,
            cache: false,
            data: data
        }).done(function(response){
            if(response.error) {
                $.fancybox('<h1>' + response.error + '</h1>');
            }else  {
                $.fancybox('<h1>' + response.success + '</h1>');
            }
        }).fail(function(){
            $.fancybox('<h1>Ошибка соединения с сервером</h1>');
        });
    };

    return {
        init: function () {
            $('.admin__form-works').on('submit', _submitForm);
        }
    }
})();

addWork.init();