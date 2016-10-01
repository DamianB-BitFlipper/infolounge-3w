//A handy function to build a standard, single block of the weather panel
buildWeatherBlock = function(forecastElem) {
    var weatherBlock = '<div class="small-3 columns">'

    //Populate the weather icon
    weatherBlock += '<img src="images/weather/' + forecastElem.code + '.png"><br/>';
    
    //Populate the big temperature numbers (F)
    weatherBlock += '<span class="weather-temp">' + forecastElem.alt.high + '&deg; / ' + 
        forecastElem.alt.low + '&deg;</span>';

    //Populate the small temperature numbers (C)
    weatherBlock += '<br/><br/><span class="weather-temp-small">' + forecastElem.high + '&deg;C / ' + 
        forecastElem.low + '&deg;C</span>';
    
    weatherBlock += '</div>';

    return weatherBlock;
}

function getWeather() {
    $.simpleWeather({
        location: 'Cambridge, MA',
        woeid: '',
        unit: 'c',
        success: function(weather) {
            html = '<span class="weather-temp-small"><div class="row">';
            html += '<div class="small-3 columns">Current</div>';
            html += '<div class="small-3 columns">' + weather.forecast[0].day + '</div>';
            html += '<div class="small-3 columns">' + weather.forecast[1].day + '</div>';
            html += '<div class="small-3 columns">' + weather.forecast[2].day + '</div>';
            html += '</div></span>';

            //console.log(weather.forecast[0].day);
            //console.log(weather.temp);

            html += '<div class="row">';

            //The weather right now
            {
                html += '<div class="small-3 columns"><img src="images/weather/' + weather.code + '.png"><br/>';
                html += '<span class="weather-temp">' + (weather.alt.temp) + 
                    '&deg; (' + weather.temp + '&deg;C)</span>';

                html += '<br/><br/><span class="weather-temp-small">Feel ' + weather.wind.chill + '&deg; (' + ((weather.wind.chill - 32) *  5 / 9).toFixed()  + '&deg;C)</span>';

                html += '</div>';
            }

            //Populate the forecasts for today, plus the next two days (3 in total)
            for(day = 0; day < 3; day++)
                html += buildWeatherBlock(weather.forecast[day]);

            //Row div
            html += '</div>';

            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
};
