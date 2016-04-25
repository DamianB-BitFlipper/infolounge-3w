function getWeather() {
    $.simpleWeather({
        location: 'Cambridge, MA',
        woeid: '',
        unit: 'c',
        success: function(weather) {
            html = '<span class="weather-feel"><div class="row">';
            html += '<div class="small-3 columns">Current</div>';
            html += '<div class="small-3 columns">' + weather.forecast[0].day + '</div>';
            html += '<div class="small-3 columns">' + weather.forecast[1].day + '</div>';
            html += '<div class="small-3 columns">' + weather.forecast[2].day + '</div>';
            html += '</div></span>';

            //console.log(weather.forecast[0].day);
            //console.log(weather.temp);

            html += '<div class="row">';
            html += '<div class="small-3 columns"><img src="images/weather/' + weather.code + '.png"><br/>';
            html += '<span class="weather-temp">' + (weather.alt.temp) + '&deg; (' + weather.temp + '&deg;C)</span>';

            if (weather.temp != weather.wind.chill) {
                html += '<br/><br/><span class="weather-feel">Feel ' + (weather.wind.chill + '&deg; (' + ((weather.wind.chill - 32) *  5 / 9).toFixed()  + '&deg;C)</span>';
            }

            html += '</div><div class="small-3 columns"><img src="images/weather/' + weather.forecast[0].code + '.png"><br/>';
            html += '<span class="weather-temp">' + weather.forecast[0].alt.high + '&deg; / ' + weather.forecast[0].alt.low + '&deg;</span></div>';
            html += '<div class="small-3 columns"><img src="images/weather/' + weather.forecast[1].code + '.png"><br/>';
            html += '<span class="weather-temp">' + weather.forecast[1].alt.high + '&deg; / ' + weather.forecast[1].alt.low + '&deg;</span></div>';
            html += '<div class="small-3 columns"><img src="images/weather/' + weather.forecast[2].code + '.png"><br/>';
            html += '<span class="weather-temp">' + weather.forecast[2].alt.high + '&deg; / ' + weather.forecast[2].alt.low + '&deg;</span></div>';
            html += '</div>';

            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
};