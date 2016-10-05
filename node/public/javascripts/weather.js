//A handy function to build a standard, single block of the weather panel
buildWeatherBlock = function(forecastElem) 
{
    var weatherBlock = '<div class="small-3 columns">';
    
    //Populate the day
    weatherBlock += '<span class="weather-temp-small">' + forecastElem.day + '</span>';

    weatherBlock += '<br/>'; //Add some line break space

    //Populate the weather icon
    weatherBlock += '<img src="images/weather/' + forecastElem.code + '.png"><br/>';
    
    //Populate the big temperature numbers (F)
    weatherBlock += '<span class="weather-temp">' + forecastElem.alt.high + '&deg; / ' + 
        forecastElem.alt.low + '&deg;</span>';

    weatherBlock += '<br/><br/>'; //Add some line break space

    //Populate the small temperature numbers (C)
    weatherBlock += '<span class="weather-temp-small">' + forecastElem.high + '&deg;C / ' + 
        forecastElem.low + '&deg;C</span>';
    
    weatherBlock += '</div>';

    return weatherBlock;
}

//Builds the block of html for the weather right now
buildWeatherNowBlock = function(weatherNow) 
{
    var weatherBlock = '<div class="small-3 columns">';

    //Populate the day
    weatherBlock += '<span class="weather-temp-small">' + 'Current' + '</span>';

    weatherBlock += '<br/>'; //Add some line break space

    //Populate the weather icon
    weatherBlock += '<img src="images/weather/' + weatherNow.code + '.png"><br/>';

    //Populate the actual temperature
    weatherBlock += '<span class="weather-temp">' + (weatherNow.alt.temp) + 
        '&deg; (' + weatherNow.temp + '&deg;C)</span>';
    
    weatherBlock += '<br/><br/>'; //Add some line break space

    //Populate the "feels like" temperature
    weatherBlock += '<span class="weather-temp-small">Feel ' + weatherNow.wind.chill + '&deg; (' + 
        ((weatherNow.wind.chill - 32) *  5 / 9).toFixed()  + '&deg;C)</span>';
    
    weatherBlock += '</div>';

    return weatherBlock;
}

function getWeather() 
{
    $.simpleWeather({
        location: 'Cambridge, MA',
        woeid: '',
        unit: 'c',
        success: function(weather) {            
            html = '<div class="row">';

            //Populate for today and 3 days in the future
            for(day = 0; day < 4; day++)
            {
                //The rendering for today's weather is handled differently
                if(!day)
                    html += buildWeatherNowBlock(weather)
                else
                    html += buildWeatherBlock(weather.forecast[day]);
            }

            //Weather Blocks row div
            html += '</div>';

            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>' + error + '</p>');
        }
    });
};
