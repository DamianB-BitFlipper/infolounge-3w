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

/** function handleAlerts(data) {
    var alerts0 = data.alerts;
    //console.log(alerts0);

    if ((Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[0].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[0].effect_periods[0].effect_end)) {
	elem = '<li><span class="tech-route2 red">&nbsp;' + alerts0[0].header_text + '</span>';
    } else if ((Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[0].effect_start) && (alerts0[0].effect_periods[0].effect_end == '')) {
	elem = '<li><span class="tech-route2 red">&nbsp;' + alerts0[0].header_text + '</span>';
    } else if ((Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[1].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[0].effect_periods[1].effect_end)) {
	elem = '<li><span class="tech-route2 red">&nbsp;' + alerts0[0].header_text + '</span>';
    } else if ((Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[2].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[0].effect_periods[2].effect_end)) {
	elem = '<li><span class="tech-route2 red">&nbsp;' + alerts0[0].header_text + '</span>';
    } else if ((Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[3].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[0].effect_periods[3].effect_end)) {
	elem = '<li><span class="tech-route2 red">&nbsp;' + alerts0[0].header_text + '</span>';
    } else if ((Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[4].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[0].effect_periods[4].effect_end)) {
	elem = '<li><span class="tech-route2 red">&nbsp;' + alerts0[0].header_text + '</span>';}

} **/

/**

function handlePredictions3(data) {
    pre_predictions0 = data.mode;
    pre_predictions1 = pre_predictions0[0].route;
    pre_predictions2 = pre_predictions1[0].direction;
    predictions = pre_predictions2[0].trip;
    time_elem1 = '';

    if (predictions.length == 0) {
	time_elem0 = '';
	time_elem1 = '';
        return;
    }


    var second = predictions[0].pre_away;
    if (second < 60) {
        time_elem0 = ' Arrv';
    } else {
        time_elem0 = (' ' + Math.round(second/60) + 'm ');
    }

    if (predictions.length > 1) {
        var second = predictions[1].pre_away;
        if (second < 60) {
            time_elem1 = ' Arrv';
        } else {
             time_elem1 = (' ' + Math.round(second/60) + 'm ');
        }
    }

    var route = predictions[0].trip_headsign;
    //console.log(predictions[0].trip_headsign);

    elem += ('<li><div class="row"><span class="tech-route red">&nbsp;' + route + ' </span><span class="tech-time">&nbsp;' + time_elem0 + '</span><span class="tech-next-time">' + time_elem1 + '&nbsp;</span></div></li>');

    $("#techpanel").slideDown("slow");
    $("#predictions").html(elem);
}

**/

function techImage(minutes){
	minutesToImage = new Object();
	minutesToImage['20'] = '7'; minutesToImage['19'] = '7'; minutesToImage['18'] = '7';
	minutesToImage['17'] = '9'; minutesToImage['16'] = '9';
	minutesToImage['15'] = '10'; // Vassar/Mass Ave
	minutesToImage['14'] = '11'; minutesToImage['13'] = '11'; // Stata
	minutesToImage['12'] = '1';	minutesToImage['11'] = '1'; // Kendall
	minutesToImage['10'] = '2'; minutesToImage['9'] = '2';
	minutesToImage['8'] = '3'; minutesToImage['7'] = '3'; minutesToImage['6'] = '3';
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
}

function handlePredictions2(data) {
	var predictions = data.items;

//  if (jQuery.isEmptyObject(predictions)){
  //  return;
//  }

	time_elem0 = '';
	time_elem1 = '';

	if (dateFormat(new Date, "HH:MM") > "19:20" || dateFormat(new Date, "HH:MM") < "6:00") {
		$('.tech-map').attr("src", "").fadeOut();
	}

  if (predictions[0].minutes == 0) {
      time_elem0 = (predictions[0].is_departing ? "Arrv " : "Arrv ");
  } else if (predictions[0]) {
      time_elem0 = (predictions[0].minutes + 'm ');
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
							if (predictions[0].is_departing) {
								$(".tech-map").fadeOut(400, function(){
									$(this).attr('src', 'images/tech/6.png' );
									$(this).fadeIn();
								});
							} else if ($(".tech-map").attr("src").length == 0) {
								techImage(predictions[1].minutes);
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
      if (predictions[0]) {
        if (predictions[0].route_id == 'tech') {
            route = 'tech shuttle';
						if (predictions[0].is_departing) {
							$(".tech-map").fadeOut(400, function(){
								$(this).attr('src', 'images/tech/6.png' );
								$(this).fadeIn();
							});
						} else {
							techImage(predictions[0].minutes);
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
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route yellow">&nbsp;' + route + ' </span><span class="tech-time">&nbsp;' + ' ' + time_elem0 + '&nbsp;</span></div></li>');
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route yellow">&nbsp;' + route1 + ' </span><span class="tech-time">&nbsp;' + ' ' + time_elem1 + '&nbsp;</span></div></li>');
    } else {
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route yellow">&nbsp;' + route + ' </span><span class="tech-time">&nbsp;' + ' ' + time_elem0 + '</span>' + ' ' + '<span class="tech-next-time"> | ' + time_elem1 + '&nbsp;</span></div></li>');
    }
  } else if (route == "tech shuttle") {
      if (route1 == '') {
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route-plus red">&nbsp;' + route + ' </span><span class="tech-time-plus">&nbsp;' + ' ' + time_elem0 + '</span>' + ' ' + '<span class="tech-next-time-plus"> | ' + time_elem1 + '&nbsp;</span></div></li>');
      } else if (route != route1) {
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route-plus red">&nbsp;' + route + ' </span><span class="tech-time-plus">&nbsp;' + ' ' + time_elem0 + '&nbsp;</span></div></li>');
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route">&nbsp;' + route1 + ' </span><span class="tech-time">&nbsp;' + ' ' + time_elem1 + '&nbsp;</span></div></li>');
      } else {
        elem += ('<li><div class="row" style="margin: 15px;"><span class="tech-route-plus red">&nbsp;' + route + ' </span><span class="tech-time-plus">&nbsp;' + ' ' + time_elem0 + '</span>' + ' ' + '<span class="tech-next-time-plus"> | ' + time_elem1 + '&nbsp;</span></div></li>');
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
    setTimeout(rollup, 1500);
    function rollup() {
      if (elem.length == 0) {
	       $("#techpanel").slideUp("slow");
      }
    }
};
