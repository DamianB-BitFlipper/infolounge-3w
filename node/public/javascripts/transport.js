var speakTag = 0;

var busUpdate = function nextBusUpdate() {

    // MIT call for Tech Shuttle and Saferide Campus Shuttle services
        $.ajax({
            url: "http://webservices.nextbus.com/service/publicJSONFeed?command=predictionsForMultiStops&a=mit&stops=saferidebostonall|tangwest&stops=saferidecampshut|tangwest&stops=tech|tangwest",
            dataType: "json",
            success: function(parsed_json) {

                var all_pred = parsed_json['predictions'];
                var bus3 = '<br>';
                //console.log(all_pred)
                for (i = 0; i < all_pred.length; i++) {

                    if (typeof all_pred[i]['dirTitleBecauseNoPredictions'] == 'undefined') {

                        var num_dir = all_pred[i]['direction'].length;
                        if (typeof num_dir == 'undefined') {
                            num_dir = 1;
                        }

                        for (j = 0; j < num_dir; j++) {
                            var curr_dir;
                            var destinT;
                            var curr_pred;
                            var walk;
                            var shortDestin;
                            var route;

                            if (num_dir == 1) {
                                curr_dir = all_pred[i]['direction'];
                            } else {
                                curr_dir = all_pred[i]['direction'][j];
                            }

                            destinT = curr_dir['title'];

                            if (all_pred[i]['routeTag'] == 'tech') {
                                route = 'Tech Shuttle';
                            } else if (all_pred[i]['routeTag'] == 'saferidebostonall') {
                                route = 'Boston All';
                            } else if (all_pred[i]['routeTag'] == 'traderjwf') {
                                route = "Trader Joe's";
                            } else if (all_pred[i]['routeTag'] == 'saferidecampshut') {
                                route = 'Saferide Campus';
                            } else if (all_pred[i]['routeTag'] == 'saferidecambwest') {
                                route = 'Cambridge West';
                            } else if (all_pred[i]['routeTag'] == 'saferidesomerville') {
                                route = 'Saferide Somerville';
                            } else {
                                route = all_pred[i]['routeTag'];
                            }


                            bus3 += "<span style='line-height:64px;'><span style='background-color:rgba(0,0,0,0.4);color:#EEEEEE;'>&nbsp;" + route + "&nbsp;</span>";

                            var num_pred = curr_dir['prediction'].length;
                            if (typeof num_pred == 'undefined') {
                                num_pred = 1;
                            }

                            for (k = 0; k < num_pred; k++) {
                                if (num_pred == 1) {
                                    curr_pred = curr_dir['prediction'];
                                } else {
                                    curr_pred = curr_dir['prediction'][k];
                                }

                                if (typeof curr_pred['affectedByLayover'] != 'undefined') {

                                    if (k < 3) {
                                        bus3 += "&nbsp;<span style='background-color:#EEEEEE;font-weight:600;color:rgba(0,0,0,0.2);'>&nbsp;" + curr_pred['minutes'] + "m";
                                    }
                                } else if (k < 2) {

                                    bus3 += "&nbsp;<span style='background-color:#EEEEEE;font-weight:600;color:rgba(0,0,0,0.8);'>&nbsp;" + curr_pred['minutes'] + "m";

                                    var tempStringg = route + ' in ' + curr_pred['minutes'] + ' speakTag: ' + speakTag;
                                    console.log(tempStringg);

                                    /* if (curr_pred['minutes'] == 1 && (route == '354' || route == '351' || route == '352') && speakTag == 0) {
                                        var textSpeak = '';
                                        if (destin.search('via') == -1) {
                                            textSpeak = 'The next.' + route + 'bus to.' + shortDestin + 'Is now approaching.';
                                        } else {
                                            textSpeak = 'The next.' + route + 'bus to. The Escondido Transit Center,' + shortDestin + 'Is now approaching.';
                                        }
                                        //responsiveVoice.speak(textSpeak, "UK English Male", {
                                            //rate: 0.8
                                        //});
                                        speakTag = 1;
                                    }

                                    if (curr_pred['minutes'] == 0 && (route == '354' || route == '351' || route == '352') && speakTag == 1) {
                                        var textSpeak = '';
                                        if (destin.search('via') == -1) {
                                            textSpeak = 'The next.' + route + 'bus to.' + shortDestin + 'Is now arriving.';
                                        } else {
                                            textSpeak = 'The next.' + route + 'bus to. The Escondido Transit Center,' + shortDestin + '...is now arriving.';
                                        }
                                        //responsiveVoice.speak(textSpeak, "UK English Male", {
                                            //rate: 0.8
                                        //});
                                        speakTag = 0;
                                    } */

                                }

                                bus3 += "&nbsp;</span>"
                            }

                            bus3 += "</span><br>";

                        }

                    } else {
                        var route;
                    }

                }
                //console.log(bus3)
                if (bus3.length < 5) {
                    $("#techpanel").slideUp("slow");
                } else {
                    $("#techpanel").slideDown("slow");
                    $("#nextbus").html(bus3);
                }
            }
        });
};

$(document).ready(function(){
    busUpdate();
    setInterval(busUpdate, 30000)
})
// default refresh rate for this module is 30 seconds