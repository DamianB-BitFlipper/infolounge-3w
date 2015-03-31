var newsURL = '/news.json';

function getNews() {
    $.getJSON(newsURL, function(data) {
        if (jQuery.isEmptyObject(data)) {
            $("#newspanel").slideUp("slow");
            return;
        }
        console.log(data);
        $("#newspanel").slideDown("slow");
        $("#news").html(data.notification);
    });
};
