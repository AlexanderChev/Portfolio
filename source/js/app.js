'use strict';

function loadScript(page) {
    return $(page).length;
}

$.extend($.fancybox.defaults, {
    helpers: {
        overlay: {
            locked: false
        }
    }
});