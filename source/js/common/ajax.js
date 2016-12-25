function ajaxForm(form, url){
    var result = $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        cache: false,
        data: form.serialize()
    }).done(function(data){
        $.fancybox('<h1>Сообщение отправлено</h1>');
    }).fail(function(){
        $.fancybox('<h1>Ошибка соединения с сервером</h1>');
    });

    return result;
}