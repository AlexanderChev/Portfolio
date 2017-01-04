function ajaxForm(data, url){
    return $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
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
}