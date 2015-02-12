var dateformat = require('../public/javascripts/dateformat.js');
var request = require('request');
var fs = require('fs');
var parseString = require('xml2js').parseString;

var menuURL = 'http://legacy.cafebonappetit.com/rss/menu/401';
var newsFile = 'public/news.dat';
var alertURL = 'http://emergency.mit.net';
//var weatherURL = 'http://forecast.weather.gov/MapClick.php?x=226&y=165&site=aly&zmx=1&zmy=1&map_x=225.5&map_y=165.13333129882812';


function getMenu(req, res) {
    request(menuURL, function(error, response, body) {
        if (error || response.statusCode != 200) {
            res.json({});
            return;
        };
        xml = body.substring(body.indexOf("<channel>"), body.indexOf("</channel>") + "</channel>".length)
        parseString(xml, function (err, result) {
          if (err) {
            res.json({});
            return;
          }
          now = new Date();
          var date = dateformat.dateFormat(now, 'ddd, dd mmm yyyy');
          console.log(date);
          //var dateIndex = body.indexOf(date);
          //if (dateIndex == -1) {
              //res.json({});
              //return;
          //}
          //var endIndex = body.indexOf('The Story Behind Your Food', dateIndex); // always at end
          //var today = body.substring(dateIndex, endIndex);

          //console.log("Menu", result);
          weeklyMenu = result.channel.item;
          todaysMenu = false;
          for (var day in weeklyMenu) {
            console.log(weeklyMenu[day]);
            if (weeklyMenu[day].title[0] == date) {
              todaysMenu = weeklyMenu[day].description[0];
              break;
            }
          }

          var breakfastIndex = todaysMenu.indexOf('Breakfast');
          var brunchIndex = todaysMenu.indexOf('Brunch');
          var dinnerIndex = todaysMenu.indexOf('Dinner');

          var time = dateformat.dateFormat(now, 'HH:mm');
          if (time > '08:00' && time < '10:15' && breakfastIndex != -1) {
            var foodIndex = todaysMenu.indexOf('[breakfast]', breakfastIndex);
            var breakfast = todaysMenu.substring(foodIndex);
                breakfast = breakfast.substring(0, breakfast.indexOf('<'));
            res.json({'Breakfast': breakfast});
          } else if (time > '09:45' && time < '13:15' && brunchIndex != -1) {
            var comfortsIndex = todaysMenu.indexOf('[comforts]', brunchIndex);
            var comforts = todaysMenu.substring(comfortsIndex);
                comforts = comforts.substring(0, comforts.indexOf('<'));
            res.json({'Brunch': comforts});
          } else if (dinnerIndex != -1) {
              var comfortsIndex = todaysMenu.indexOf('[comforts]', dinnerIndex) + '[comforts]'.length;
              var grillIndex = todaysMenu.indexOf('[smokehouse grill]', dinnerIndex) + '[smokehouse grill]'.length;
              var stirfryIndex = todaysMenu.indexOf('[action]', dinnerIndex) + '[action]'.length;
              var comforts = todaysMenu.substring(comfortsIndex);
                  comforts = comforts.substring(0, comforts.indexOf('<h4>'));
              var grill = todaysMenu.substring(grillIndex);
                  grill = grill.substring(0, grill.indexOf('<'));
              var stirfry = todaysMenu.substring(stirfryIndex);
                  stirfry = stirfry.substring(0, stirfry.indexOf('&nbsp;'));
              //console.log({'Comfort': comforts, 'Grill': grill, 'Stir Fry': stirfry})
              res.json({'Comfort': comforts, 'Grill': grill, 'Stir Fry': stirfry});

          } else {
              res.json({});
          }
        });


    });
};

function sanitizeText(text) {
	//console.log(text);
	text = text.replace(/[\n\r]/g, ' ').replace('</p>','').replace('<b>','').replace('</b>','');
	return text;
}


function getMITAlert(req, res) {
    //console.log('Begin test!');
    request(alertURL, function(error, response, body){
	if (error || response.statusCode != 200){
		res.json({});
		return;
	}

    var now = new Date();
    var startIndex = body.indexOf('<div id="contentannouncebox">');

    var data = body.substring(startIndex, body.indexOf('</div>', startIndex));

	//console.log('DATAING');
	//console.log(data);

  var alertsStr = sanitizeText(data).split('<p>');
    //console.log(alertsStr);
  var alerts = {};
  for (i = 0; ++i < alertsStr.length;){
	head = sanitizeText(alertsStr[i]);
	alert = sanitizeText(alertsStr[i+1]);
  if (alert.length > 10 && head.length > 10){
		alerts[head] = alert;
	}
  if (Object.keys(alerts).length >= 1) {
		break;
	}
    }
    //console.log(alerts);
    res.json(alerts);
    });
};



function getNews(req, res) {
    if (fs.existsSync(newsFile)) {
        data = fs.readFileSync(newsFile, 'utf8').split('\n');
        code = dateformat.dateFormat('m/dd');
        for (var i = 0; i < data.length; i += 2) {
            if (code == data[i]) {
                res.json({'news': data[i + 1]});
                return;
            }
        }
    }
    res.json({});
    return;
};

function getImg(req, res) {
    var imgurl = req.query.imgurl;
    request(imgurl, function(error, response, body) {
        if (error || response.statusCode != 200) {
            res.json({});
            return;
        };
        var imageLink = body.match(new RegExp('<img class="large media-slideshow-image"[^>]+'));
        if (imageLink == null) {
            res.json({});
            return;
        }
        var realurl = imageLink[0].match(/src="[^"]+/)[0].substring(5); // trim to only url
        res.json({'imgurl': realurl});
    });
};

exports.getMenu = getMenu;
exports.getMITAlert = getMITAlert;
exports.getNews = getNews;
exports.getImg = getImg;
