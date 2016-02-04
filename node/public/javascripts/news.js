var newsURL = '/news.json';
var once = false;

function getNews() {
	if (! (graduation && once) ) {
	    $.getJSON(newsURL, function(data) {
	    	once = true;
	        if (jQuery.isEmptyObject(data)) {
	            $("#newspanel").slideUp("slow");
	            return;
	        }
	        //console.log(data);
	        $("#newspanel").slideDown("slow");
	        $("#news").html(data.notification);
	    });
	}
};
