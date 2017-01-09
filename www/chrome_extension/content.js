$(document).ready(function () {

    $.get(chrome.extension.getURL('www/chrome_extension/ionic-ball.html'), function(data) {
        $(data).appendTo('body');
        // Or if you're using $ 1.8+:
        // $($.parseHTML(data)).appendTo('body');
    });

    var appHolder = $('#ionic-app-holder');
    var appFrame = $('#ionic-app-frame');
    var showHideButton = $('#qm-ionic-app-show-hide');

    setTimeout(function () {
        showHideButton.show();
    }, 4444);

    showHideButton.click(function () {

        appHolder.toggle();

        if (appHolder.is(':visible')) {
            showHideButton.css('right', '450px');
            showHideButton.css('bottom', '90%');
            showHideButton.css('transform',          'rotate(125deg)');
            showHideButton.css('-ms-transform',      'rotate(125deg)');
            showHideButton.css('-moz-transform',     'rotate(125deg)');
            showHideButton.css('-webkit-transform',  'rotate(125deg)');
            showHideButton.css('-o-transform',       'rotate(125deg)');
        } else {
            showHideButton.css('bottom', '15px');
            showHideButton.css('transform',          'rotate(0deg)');
            showHideButton.css('-ms-transform',      'rotate(0deg)');
            showHideButton.css('-moz-transform',     'rotate(0deg)');
            showHideButton.css('-webkit-transform',  'rotate(0deg)');
            showHideButton.css('-o-transform',       'rotate(0deg)');
            showHideButton.css('right', '80px');
        }

    });

    appFrame.on('load', function() {
        $(this).css('height', 600);
        // try after 2 seconds to find correct height
        setTimeout(fixHeight, 2000);

        // try after 5 seconds to be perfectly sure all the xhr content loaded
        setTimeout(fixHeight, 5000);
    });

    // Uncomment to open Ionic tab by default
    //showHideButton.click();

});

function fixHeight() {
    var height = 0;
    var appFrame = $('#ionic-app-frame');
    appFrame.contents().find(".card").each(function(index, element) {
        height += element.scrollHeight;
    });
    appFrame.css('height', height + 100);
    appFrame.contents().find('.overflow-scroll').css('overflow-y', 'hidden');
}
