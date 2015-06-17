var menuURL = '/menu.json';

var menuCache = {};

function getMenu() {
    $.getJSON(menuURL, function(data) {
        if (jQuery.isEmptyObject(data)) {
            $("#menupanel").slideUp("slow");
            return;
        }

        var elem = '';
        for (var type in data) {
            var item = data[type]
            item = item.replace('steamed', '');
            elem += ('<li><span class="foodtype">' + type + '</span> <b>' + item + '</b></li>');
        }
        if (elem.length == 0) {
            $("#menupanel").slideUp("slow");
            return;
        } else {
            $("#menupanel").slideDown("slow");
            $("#menu").html(elem);
        }

        /* Search for images */
        for (var type in data) {
            var query = data[type].split('&nbsp;')[0];
            //console.log(query)
            if (menuCache[query]) {
                document.getElementById("menu").innerHTML += menuCache[query];
            } else {
                $.getScript("https://www.googleapis.com/customsearch/v1?key=AIzaSyDrATZhqJcmBUE700msJtCWFOe96FIVsx8&cx=013902053734636094783:5ckniww7ndi&q=" + encodeURIComponent(query) + "&callback=menuHandler&searchType=image");
            }
        }
        // $('.menu-img').fadeIn();

    });
};

function menuHandler(response) {
    query = response.queries.request[0].searchTerms;
    menuCache[query] = "<img class = 'menu-img' src=" + response.items[0].link + " alt='' width=10vw style='padding:3px;'>";
    document.getElementById("menu").innerHTML += menuCache[query];
}