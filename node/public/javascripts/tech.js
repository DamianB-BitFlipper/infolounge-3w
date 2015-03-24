L.mapbox.accessToken = 'pk.eyJ1Ijoic2FmZXR5dGhpcmQiLCJhIjoiZXRHMHljWSJ9.iVYPbAJQjKnlAd5DYwY6Iw';
var template_url = 'https://a.tiles.mapbox.com/v4/safetythird.lb5k4ajm/features.json?access_token=' + L.mapbox.accessToken;
var techstops_url ='https://a.tiles.mapbox.com/v4/safetythird.lbg583om/features.json?access_token=' + L.mapbox.accessToken;
var Markers = new Array();
var Paths = new Array();
var t = 0;
var MAP;
var updateMapRate = 200; // ms

var predictionsTEK = "http://proximobus.appspot.com/agencies/mit/stops/51/predictions.json";

var predictionsSFBOS = "http://proximobus.appspot.com/agencies/mit/stops/62/predictions.json";
	// saferide boston, at audrey/vassar sts

var predictionsCT2N = "http://proximobus.appspot.com/agencies/mbta/stops/21772/predictions.json";
	// crosstown 2, to sullivan sq via kendall sq, at amesbury/vassar sts

var predictionsCT2S = "http://proximobus.appspot.com/agencies/mbta/stops/22173/predictions.json";
	// crosstown 2, to ruggles st/northereastern university via fenway, at amesbury st/memorial dr

var elem = '';
var time_elem1 = '';
var time_elem2 = '';
var tone = 0;
var pre_predictions0;
var pre_predictions1;
var pre_predictions2;
var predictions;


/** function techImage(minutes){
	minutesToImage = new Object();
	minutesToImage['23'] = '7'; minutesToImage['22'] = '7'; minutesToImage['21'] = '7';
	minutesToImage['20'] = '7'; minutesToImage['19'] = '7'; minutesToImage['18'] = '7';
	minutesToImage['17'] = '9'; minutesToImage['15'] = '9'; // Simmons
	minutesToImage['15'] = '10'; // Vassar/Mass Ave
	minutesToImage['14'] = '11'; minutesToImage['13'] = '11'; // Stata
	minutesToImage['12'] = '1';	minutesToImage['11'] = '1'; // Kendall
	minutesToImage['10'] = '2'; minutesToImage['9'] = '2'; // Amherst/Wadswordth
	minutesToImage['8'] = '3'; minutesToImage['7'] = '3'; minutesToImage['6'] = '3'; // Ames St./Media Lab
	minutesToImage['5'] = '4'; minutesToImage['4'] = '4'; minutesToImage['3'] = '4'; // Kresge
	minutesToImage['2'] = '5'; minutesToImage['1'] = '5'; // Burton
  var imageId = minutesToImage[minutes.toString()];
	if (typeof imageId !== "undefined"){
		var src =  "images/tech/" + minutesToImage[minutes.toString()] + '.png';
		$('.tech-map').attr('src', src).fadeIn();
		return src;
	} else {
		$('.tech-map').attr("src", "").fadeOut();
		return -1;
	}
} **/

function updateMap(minutes) {
renderMap();
$.getJSON(techstops_url, function(data){
	    for(var m = 0; m < Markers.length; m++){
	    	MAP.removeLayer(Markers[m]);
			}
    	Markers = new Array();
	    Paths = new Array();
			t = 0;
      var points = data.features;
			var startPoint; var endPoint;
			var startCoord; var endCoord;
      for (var i = 0; i < points.length; i++) {
				var properties = points[i].properties;
				//console.log(properties);
				if (properties.description.indexOf(minutes + ' min') == 0){
					startPoint = points[i];
					startCoord = startPoint.geometry.coordinates;
					//console.log("startCoord", startCoord);
					//console.log("startPoint", startPoint);
					for (var j = 0; j < points.length; j++){
						next = (parseInt(minutes)+23)%24;
						if (points[j].properties.description.indexOf(next + ' min') == 0){
							endPoint = points[j];
							endCoord = endPoint.geometry.coordinates;
							//console.log("endPoint", endPoint);
							break;
						}
					}
				}
			}
				var movingTitle = startPoint.properties.title;
		   	var nextTitle = startPoint.properties.description.replace(minutes.toString() + " min ", "");
        var marker = L.marker(startCoord, {
          icon: L.mapbox.marker.icon(startPoint.properties)
        }).bindPopup('<div class="marker-title">' + '<p class="title-moving">' + movingTitle + '</p>' + '<p class="title-stopped" style="display:none">' + nextTitle + '</p>' + '</div>').addTo(MAP);
        Markers.push(marker);
				if (movingTitle.length > 0){
					$($(".leaflet-marker-icon")[0]).click();
					$(".title-stopped").hide();
				}
        Paths.push(new Object({ type: 'LineString', coordinates: [] }));
				timeSteps = Math.floor(60000 / updateMapRate);
				momentum = [(endCoord[0] - startCoord[0]) / timeSteps, (endCoord[1] - startCoord[1])/ timeSteps];
				nextCoord = startCoord;
        for (var p = 0; p < timeSteps; p++) {
            nextCoord = [momentum[0] + nextCoord[0], momentum[1] + nextCoord[1]]
            Paths[0].coordinates.push(nextCoord.slice());
        }
				MAP.setView([startCoord[1]+0.002, startCoord[0]], 15);
			//console.log(Paths[0].coordinates);
      //$(".last-updated").hide();
      //$(".last-updated").html(" Last Updated: <b>" + dateFormat(now, "H:MM tt") + "</b>").fadeIn(1000);
			L.geoJson(Paths[0],{
					style: {
						"color": "#960000",
						"weight": 5,
						"opacity": 0.65
					}
			}).addTo(MAP);
      tick();
			setInterval(function(){
				try{
				MAP.setView([Paths[0].coordinates[t][1]+0.002,
	        Paths[0].coordinates[t][0]]);
				} catch(e){}}, 10000);
    }
  );
}

function tick() {
  //console.log(Markers.length);
  for (var j=0; j < Markers.length; j++){
      var marker = Markers[j];
      marker.setLatLng(L.latLng(
        Paths[j].coordinates[t][1],
        Paths[j].coordinates[t][0]));
  }
  //console.log(Markers[0])
	if (t==Paths[0].coordinates.length-1){
		$(".title-moving").hide();
		$(".title-stopped").fadeIn(1000);
	}
	t = Math.min(t+1, Paths[0].coordinates.length-1);
	//console.log(t);
  setTimeout(tick, updateMapRate);
}

function renderMap() {
	$("#techmap").fadeIn();
  try{
     MAP = L.mapbox.map('techmap', 'safetythird.lbg7km06')
    .setView([42.35866, -71.09370], 15);
     // setTimeout(function(){setInterval(function(){$($('img')[Math.floor(Math.random()*100)]).click()}, 3000)}, 10000);
  } catch(e){}
}

function handlePredictions2(data) {
	var predictions = data.items;

//  if (jQuery.isEmptyObject(predictions)){
  //  return;
//  }

	time_elem0 = '';
	time_elem1 = '';

	if (dateFormat(new Date, "HH:MM") > "19:10" || dateFormat(new Date, "HH:MM") < "06:00") {
		$('.tech-map').attr("src", "").fadeOut();
		$("#techmap").fadeOut();
	}

	if (!jQuery.isEmptyObject(predictions)){
	  if (predictions[0].minutes == 0) {
	      time_elem0 = (predictions[0].is_departing ? "Arrv " : "Arrv ");
	  } else if (predictions[0]) {
	      time_elem0 = (predictions[0].minutes + 'm');
	  }
	}

	//console.log(time_elem0);
	var route1 = '';

	if (predictions.length > 1) {
		if (predictions[1].minutes == 0) {
        	    time_elem1 = (predictions[1].is_departing ? "Arrv " : "Arrv ");
        	} else {
        	    time_elem1 = (predictions[1].minutes + 'm ');
       		}
        	if (predictions[1].route_id == 'tech') {
        	    route1 = 'tech shuttle';
							if (time_elem1 == "Arrv ") {
							/**	$(".tech-map").fadeOut(400, function(){
									$(this).attr('src', 'images/tech/6.png' ).fadeIn();
								}); **/
							}
        	} else if (predictions[1].route_id == 'saferidecambwest') {
        	    route1 = 'Cambridge West';
        	} else if (predictions[1].route_id == 'saferidecamball') {
        	    route1 = 'Cambridge All';
        	} else if (predictions[1].route_id == 'traderjwf') {
        	    route1 = 'Trader Joe\'s';
	      	} else if (predictions[1].route_id == 'saferidebostonall') {
        	    route1 = 'Boston All';
		      } else if (predictions[1].route_id == 'saferidecampshut') {
        	    route1 = 'Saferide Campus';
        	} else if (predictions[1].route_id == 'saferidebostonw') {
        	    route1 = 'Boston West';
        	} else if (predictions[1].route_id == '747' && tone == 0) {
        	    route1 = 'CT2 Ruggles St';
        	} else if (predictions[1].route_id == '747' && tone == 1) {
        	    route1 = 'CT2 Sullivan Sq';
        	} else {
	            route1 = predictions[1].route_id;
        	}
	}

  console.log(route1);

      var route = '';
      if (typeof predictions[0]!== "undefined") {
        if (predictions[0].route_id == 'tech') {
            route = 'tech shuttle';
						if (time_elem0 == "Arrv ") {
						/**	$(".tech-map").fadeOut(400, function(){
								$(this).attr('src', 'images/tech/6.png' ).fadeIn();
							}); **/
							updateMap("0");
						} else {
							time_elem0 += "&nbsp;&nbsp;"
							//console.log("Loading image...")
							updateMap(predictions[0]["minutes"]);
						}
        } else if (predictions[0].route_id == 'saferidecambwest') {
            route = 'Cambridge West';
        } else if (predictions[0].route_id == 'saferidecamball') {
            route = 'Cambridge All';
	      } else if (predictions[0].route_id == 'saferidecampshut') {
       	    route = 'Saferide Campus';
        } else if (predictions[0].route_id == 'traderjwf') {
            route = 'Trader Joe\'s';
	      } else if (predictions[0].route_id == 'saferidebostonall') {
            route = 'Boston All';
        } else if (predictions[0].route_id == 'saferidebostonw') {
            route = 'Boston West';
        } else if (predictions[0].route_id == '747' && tone == 0) {
            route = 'CT2 Ruggles St';
        } else if (predictions[0].route_id == '747' && tone == 1) {
            route = 'CT2 Sullivan Sq';
        } else {
            route = predictions[0].route_id;
        }
      }
      console.log(route);

	//console.log(route);
  if (route != 'tech shuttle' && route != '') {
    if (route1 == '') {
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route yellow">&nbsp;' + route + ' </span><span class="tech-time">&nbsp;' + ' ' + time_elem0 + '</span>' + ' ' + '<span class="tech-next-time"> | ' + time_elem1 + '&nbsp;</span></div></li>');
    } else if (route != route1) {
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route yellow">&nbsp;' + route + ' </span><span class="tech-time">&nbsp;' + ' ' + time_elem0 + '&nbsp;|</span></div></li>');
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route yellow">&nbsp;' + route1 + ' </span><span class="tech-time">&nbsp;' + ' ' + time_elem1 + '&nbsp;</span></div></li>');
    } else {
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route yellow">&nbsp;' + route + ' </span><span class="tech-time">&nbsp;' + ' ' + time_elem0 + '&nbsp; | </span>' + '<span class="tech-next-time"> | ' + time_elem1 + '&nbsp;</span></div></li>');
    }
  } else if (route == "tech shuttle") {
      if (route1 == '') {
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route-plus red">&nbsp;' + route + '&nbsp;</span><span class="tech-time-plus">&nbsp;' + ' ' + time_elem0 + '</span>' + ' ' + '<span class="tech-next-time-plus"> | ' + time_elem1 + '&nbsp;</span></div></li>');
      } else if (route != route1) {
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route-plus red">&nbsp;' + route + '&nbsp;</span><span class="tech-time-plus">&nbsp;' + ' ' + time_elem0 + '&nbsp;</span></div></li>');
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route">&nbsp;' + route1 + ' </span><span class="tech-time">&nbsp;' + ' ' + time_elem1 + '&nbsp;</span></div></li>');
      } else {
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route-plus red">&nbsp;' + route + '&nbsp;</span><span class="tech-time-plus">&nbsp;' + time_elem0 + '&nbsp; | </span>' + '<span class="tech-next-time-plus"> | ' + time_elem1 + '&nbsp;</span></div></li>');
      }
 } else {
    return;
  }

    $("#techpanel").slideDown("slow");
    $("#predictions").html(elem);
}
/**
function handlePredictions1(data) {
    var predictions = data.items;

    for (var i = 0; i < 1; i++) {
        prediction = predictions[i];
        elem += '<li><span class="tech-minutes">';

        var minutes = prediction.minutes;
        if (minutes == 0) {
            elem += (prediction.is_departing ? "Arrv</span>&nbsp;<span class='tech-route'>" : "Arrv</span>&nbsp;<span class='tech-route'>&nbsp;");
        } else {
            elem += (minutes + '</span>&nbsp;<span class="tech-route">m ');
        }

        var route = '';
        if (prediction.route_id == 'saferidebostonall') {
            route = 'ZBT/Packard\'s Corner';
        } else if (prediction.route_id == 'saferidebostonw') {
            route = 'ZBT/Packard\'s Corner';
        } else if (prediction.route_id == '747' && tone == 0) {
            route = 'CT2, Fenway/Northeastern';
	    tone = 1;
        } else if (prediction.route_id == '747' && tone == 1) {
            route = 'CT2, Kendall/Sullivan Sqs';
        } else {
            route = prediction.route_id;
        }
        elem += ('&nbsp;-&nbsp;&nbsp;' + route + '</span></li>');
    }

    $("#techpanel").slideDown("slow");
    $("#predictions").html(elem);
}
**/

function getPredictions() {
    elem = '';
    $.getJSON(predictionsTEK, handlePredictions2);
    $.getJSON(predictionsSFBOS, handlePredictions2);
    tone = 0;
    setTimeout(southtime, 1500);
    function southtime() {
       	tone = 0;
	      $.getJSON(predictionsCT2S, handlePredictions2);
    }
    tone = 1;
    setTimeout(northtime, 3000);
    function northtime() {
	      tone = 1;
        $.getJSON(predictionsCT2N, handlePredictions2);
    }
    setTimeout(rollup, 2000);
    function rollup() {
      if (elem.length == 0) {
	       $("#techpanel").slideUp("slow");
      }
    }
};
