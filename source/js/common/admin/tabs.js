'use strict';

var adminTabs = (function () {
    var _changeTab = function (evt) {
        evt.preventDefault();

        var item = $(this).closest('.admin__control-item'),
            contentItem = $('.admin__tab'),
            itemPos = item.index();

        contentItem.eq(itemPos)
            .add(item)
            .addClass('active')
            .siblings()
            .removeClass('active');
    };

    return {
        init: function () {
            $('.admin__control-link').on('click', _changeTab);
        }
    }
})();

adminTabs.init();