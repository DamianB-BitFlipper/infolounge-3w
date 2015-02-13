var elemt = '';
var alertsREDsouth = "http://realtime.mbta.com/developer/api/v2/alertsbyroute?api_key=rx_hA9SfFEOuTpxT4fGKrw&route=933_&include_access_alerts=false&include_service_alerts=true&format=json"
	// alert messages for Southbound Red Line

function handleAlerts(data) {
    var alerts0 = data.alerts;
    elemt = '';

    //console.log(alerts0[0].effect_periods[0].effect_start);
    //console.log("how long "+alerts0.length);

    if ((alerts0[0].effect_periods.length > 0) && (Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[0].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[0].effect_periods[0].effect_end)) {
	elemt = '<span class="tech-alert">' + alerts0[0].header_text + '</span>';
    } else if ((alerts0[0].effect_periods.length > 0) && (Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[0].effect_start) && (alerts0[0].effect_periods[0].effect_end == '')) {
	elemt = '<span class="tech-alert">' + alerts0[0].header_text + '</span>';
    } else if ((alerts0[0].effect_periods.length > 1)&& (Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[1].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[0].effect_periods[1].effect_end)) {
	elemt = '<span class="tech-alert">' + alerts0[0].header_text + '</span>';
    } else if ((alerts0[0].effect_periods.length > 2)&& (Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[2].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[0].effect_periods[2].effect_end)) {
	elemt = '<span class="tech-alert">' + alerts0[0].header_text + '</span>';
    } else if ((alerts0[0].effect_periods.length > 3)&& (Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[3].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[0].effect_periods[3].effect_end)) {
	elemt = '<span class="tech-alert">' + alerts0[0].header_text + '</span>';
    } else if ((alerts0[0].effect_periods.length > 4)&& (Math.round(new Date().getTime()/1000.0) > alerts0[0].effect_periods[4].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[0].effect_periods[4].effect_end)) {
	elemt = '<span class="tech-alert">' + alerts0[0].header_text + '</span>';}
    	 else if (alerts0.length > 1) { //console.log("now try two");

////console.log((alerts0[2].effect_periods.length > 0)&& (Math.round(new Date().getTime()/1000.0) > alerts0[2].effect_periods[0].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[2].effect_periods[0].effect_end));
////console.log((alerts0[2].effect_periods.length > 0));
////console.log((Math.round(new Date().getTime()/1000.0)));
////console.log(alerts0[2].effect_periods[0].effect_start);
//console.log("length "+alerts0.length);

	    if ((alerts0[1].effect_periods.length > 0) && (Math.round(new Date().getTime()/1000.0) > alerts0[1].effect_periods[0].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[1].effect_periods[0].effect_end)) {
//console.log("found match");
		elemt = '<span class="tech-alert">' + alerts0[1].header_text + '</span>';
	    } else if ((alerts0[1].effect_periods.length > 0) && (Math.round(new Date().getTime()/1000.0) > alerts0[1].effect_periods[0].effect_start) && (alerts0[1].effect_periods[0].effect_end == '')) {
//console.log("found match");
		elemt = '<span class="tech-alert">' + alerts0[1].header_text + '</span>';
	    } else if ((alerts0[1].effect_periods.length > 1)&& (Math.round(new Date().getTime()/1000.0) > alerts0[1].effect_periods[1].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[1].effect_periods[1].effect_end)) {
//console.log("found match");
		elemt = '<span class="tech-alert">' + alerts0[1].header_text + '</span>';
	    } else if ((alerts0[1].effect_periods.length > 2)&& (Math.round(new Date().getTime()/1000.0) > alerts0[1].effect_periods[2].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[1].effect_periods[2].effect_end)) {
//console.log("found match");
		elemt = '<span class="tech-alert">' + alerts0[0].header_text + '</span>';
	    } else if ((alerts0[1].effect_periods.length > 3)&& (Math.round(new Date().getTime()/1000.0) > alerts0[1].effect_periods[3].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[1].effect_periods[3].effect_end)) {
//console.log("found match");
		elemt = '<span class="tech-alert">' + alerts0[1].header_text + '</span>';
	    } else if ((alerts0[1].effect_periods.length > 4)&& (Math.round(new Date().getTime()/1000.0) > alerts0[1].effect_periods[4].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[1].effect_periods[4].effect_end)) {
//console.log("found match");
		elemt = '<span class="tech-alert">' + alerts0[1].header_text + '</span>';}

	    else if (alerts0.length > 2) { //console.log("now try third");
	    	if ((alerts0[2].effect_periods.length > 0) && (Math.round(new Date().getTime()/1000.0) > alerts0[2].effect_periods[0].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[2].effect_periods[0].effect_end)) {
//console.log("case1 for alert3");

			elemt = '<span class="tech-alert">' + alerts0[2].header_text + '</span>';
		    } else if ((alerts0[2].effect_periods.length > 0) && (Math.round(new Date().getTime()/1000.0) > alerts0[2].effect_periods[0].effect_start) && (alerts0[2].effect_periods[0].effect_end == '')) {
//console.log("case2 for alert3");
			elemt = '<span class="tech-alert">' + alerts0[2].header_text + '</span>';
		    } else if ((alerts0[2].effect_periods.length > 1)&& (Math.round(new Date().getTime()/1000.0) > alerts0[2].effect_periods[1].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[2].effect_periods[1].effect_end)) {
			elemt = '<span class="tech-alert">' + alerts0[2].header_text + '</span>';
		    } else if ((alerts0[2].effect_periods.length > 2)&& (Math.round(new Date().getTime()/1000.0) > alerts0[2].effect_periods[2].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[2].effect_periods[2].effect_end)) {
			elemt = '<span class="tech-alert">' + alerts0[2].header_text + '</span>';
		    } else if ((alerts0[2].effect_periods.length > 3)&& (Math.round(new Date().getTime()/1000.0) > alerts0[2].effect_periods[3].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[2].effect_periods[3].effect_end)) {
			elemt = '<span class="tech-alert">' + alerts0[2].header_text + '</span>';
		    } else if ((alerts0[2].effect_periods.length > 4)&& (Math.round(new Date().getTime()/1000.0) > alerts0[2].effect_periods[4].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[2].effect_periods[4].effect_end)) {
			elemt = '<span class="tech-alert">' + alerts0[2].header_text + '</span>';}

		      else if (alerts0.length > 3) {
	    		if ((alerts0[3].effect_periods.length > 0) && (Math.round(new Date().getTime()/1000.0) > alerts0[3].effect_periods[0].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[3].effect_periods[0].effect_end)) {
				elemt = '<span class="tech-alert">' + alerts0[3].header_text + '</span>';
		   	} else if ((alerts0[3].effect_periods.length > 0) && (Math.round(new Date().getTime()/1000.0) > alerts0[3].effect_periods[0].effect_start) && (alerts0[2].effect_periods[0].effect_end == '')) {
				elemt = '<span class="tech-alert">' + alerts0[3].header_text + '</span>';
			} else if ((alerts0[3].effect_periods.length > 1)&& (Math.round(new Date().getTime()/1000.0) > alerts0[3].effect_periods[1].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[3].effect_periods[1].effect_end)) {
				elemt = '<span class="tech-alert">' + alerts0[3].header_text + '</span>';
	       	 	} else if ((alerts0[3].effect_periods.length > 2)&& (Math.round(new Date().getTime()/1000.0) > alerts0[3].effect_periods[2].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[3].effect_periods[2].effect_end)) {
				elemt = '<span class="tech-alert">' + alerts0[3].header_text + '</span>';
		    	} else if ((alerts0[3].effect_periods.length > 3)&& (Math.round(new Date().getTime()/1000.0) > alerts0[3].effect_periods[3].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[3].effect_periods[3].effect_end)) {
				elemt = '<span class="tech-alert">' + alerts0[3].header_text + '</span>';
		    	} else if ((alerts0[3].effect_periods.length > 4)&& (Math.round(new Date().getTime()/1000.0) > alerts0[3].effect_periods[4].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[3].effect_periods[4].effect_end)) {
				elemt = '<span class="tech-alert">' + alerts0[3].header_text + '</span>';}

			  else if (alerts0.length > 4) {
	    			if ((alerts0[4].effect_periods.length > 0) && (Math.round(new Date().getTime()/1000.0) > alerts0[4].effect_periods[0].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[4].effect_periods[0].effect_end)) {
					elemt = '<span class="tech-alert">' + alerts0[4].header_text + '</span>';
			   	} else if ((alerts0[4].effect_periods.length > 0) && (Math.round(new Date().getTime()/1000.0) > alerts0[4].effect_periods[0].effect_start) && (alerts0[4].effect_periods[0].effect_end == '')) {
					elemt = '<span class="tech-alert">' + alerts0[4].header_text + '</span>';
				} else if ((Math.round(new Date().getTime()/1000.0) > alerts0[4].effect_periods[1].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[4].effect_periods[1].effect_end)) {
					elemt = '<span class="tech-alert">' + alerts0[4].header_text + '</span>';
		       	 	} else if ((Math.round(new Date().getTime()/1000.0) > alerts0[4].effect_periods[2].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[4].effect_periods[2].effect_end)) {
					elemt = '<span class="tech-alert">' + alerts0[4].header_text + '</span>';
			    	} else if ((Math.round(new Date().getTime()/1000.0) > alerts0[4].effect_periods[3].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[4].effect_periods[3].effect_end)) {
					elemt = '<span class="tech-alert">' + alerts0[4].header_text + '</span>';
			    	} else if ((Math.round(new Date().getTime()/1000.0) > alerts0[4].effect_periods[4].effect_start) && (Math.round(new Date().getTime()/1000.0) < alerts0[4].effect_periods[4].effect_end)) {
					elemt = '<span class="tech-alert">' + alerts0[4].header_text + '</span>';}
				} }}}

setTimeout(rollup, 1500);
//console.log("LengthA:"+elemt.length+" Content:"+elemt+"X");
    function rollup() {
        if (elemt.length == 0) {
		//console.log("ZERO LENGTH");
		$("#alertspanel").slideUp("slow");
        } else {
		//console.log("ACTIVE ALERT");
		$("#alertspanel").slideDown("slow");
	}
    }

//console.log("LengthC:"+elemt.length+" Content:"+elemt+"X");
    $("#alerts").html(elemt);
}

function getAlerts() {
    elemt = '';
    setTimeout(alertss, 500);
    function alertss() {
	$.getJSON(alertsREDsouth, handleAlerts);
    }
//    $.getJSON(GetMITAlerts);
   // setTimeout(rollup, 1500);
////console.log("LengthA:"+elemt.length+" Content:"+elemt+"X");
  //  function rollup() {
    //    if (elemt.length == 0) {
////console.log("ZERO LENGTH");
//	    $("#alertspanel").slideUp("slow");
  //      }
    //}
//console.log("LengthB:"+elemt.length+" Content:"+elemt+"X");
}
