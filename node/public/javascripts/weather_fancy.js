        var getWeather = function wxUpdater() {    
            
            jQuery(document).ready(function($) {
                $.ajax({
                    url : "http://api.wunderground.com/api/386bbb51ae9eb3bd/hourly/forecast/alerts/conditions/q/MA/Cambridge.json",
                    dataType : "jsonp",
                    success : function(parsed_json) {
                        var scrollText = '';
                        var cur_temp_f = Math.round(parsed_json['current_observation']['temp_f']);
                        var cur_feel_f = Math.round(parsed_json['current_observation']['feelslike_f']);
                        var cur_wx = parsed_json['current_observation']['weather'];
                        var cur_icon = parsed_json['current_observation']['icon_url'];
                        cur_icon = cur_icon.substring(cur_icon.lastIndexOf("/")+1, cur_icon.length-4);
                        var t0_precip = parsed_json['hourly_forecast'][0]['pop'];

                        if(cur_wx.search("Heavy Thunderstorm") > -1) {
                            cur_icon = "heavytstorms";
                        }
                        if(cur_wx.search("Funnel") > -1) {
                            cur_icon = "funnelcloud";
                        }
                        if(cur_wx.search("Funnel") > -1) {
                            cur_icon = "funnelcloud";
                        }

                        //document.getElementById("currentTemp").innerHTML = cur_temp_f + '&deg; (Escondido, CA)';
                        // OPTIONAL module for use in debugging/displaying multiple locations
                        
                        var items = '<tr>';

                        var t2_hour = parsed_json['hourly_forecast'][2]['FCTTIME']['hour'];
                        var t2_temp_f = Math.round(parsed_json['hourly_forecast'][2]['temp']['english']);
                        var t2_feel_f = Math.round(parsed_json['hourly_forecast'][2]['feelslike']['english']);
                        var t2_wx = parsed_json['hourly_forecast'][2]['wx'];
                        var t2_icon = parsed_json['hourly_forecast'][2]['icon_url'];
                        t2_icon = t2_icon.substring(28,t2_icon.length-4);
                        var t2_precip = parsed_json['hourly_forecast'][2]['pop'];

                        if(t2_wx.search("Heavy Thunderstorm") > -1) {
                            t2_icon = "heavytstorms";
                        }
                        if(t2_wx.search("Funnel") > -1) {
                            t2_icon = "funnelcloud";
                        }
                        if(cur_wx.search("Blizzard") > -1) {
                            cur_icon = "A_BZ";
                        }

                        var t5_hour = parsed_json['hourly_forecast'][5]['FCTTIME']['hour'];
                        var t5_temp_f = Math.round(parsed_json['hourly_forecast'][5]['temp']['english']);
                        var t5_feel_f = Math.round(parsed_json['hourly_forecast'][5]['feelslike']['english']);
                        var t5_wx = parsed_json['hourly_forecast'][5]['wx'];
                        var t5_icon = parsed_json['hourly_forecast'][5]['icon_url'];
                        t5_icon = t5_icon.substring(28,t5_icon.length-4);
                        var t5_precip = parsed_json['hourly_forecast'][5]['pop'];

                        if(t5_wx.search("Heavy Thunderstorm") > -1) {
                            t5_icon = "heavytstorms";
                        }
                        if(t5_wx.search("Funnel") > -1) {
                            t5_icon = "funnelcloud";
                        }
                        if(cur_wx.search("Blizzard") > -1) {
                            cur_icon = "A_BZ";
                        }

                        var t8_hour = parsed_json['hourly_forecast'][8]['FCTTIME']['hour'];
                        var t8_temp_f = Math.round(parsed_json['hourly_forecast'][8]['temp']['english']);
                        var t8_feel_f = Math.round(parsed_json['hourly_forecast'][8]['feelslike']['english']);
                        var t8_wx = parsed_json['hourly_forecast'][8]['wx'];
                        var t8_icon = parsed_json['hourly_forecast'][8]['icon_url'];
                        t8_icon = t8_icon.substring(28,t8_icon.length-4);
                        var t8_precip = parsed_json['hourly_forecast'][8]['pop'];

                        if(t8_wx.search("Heavy Thunderstorm") > -1) {
                            t11_icon = "heavytstorms";
                        }
                        if(t8_wx.search("Funnel") > -1) {
                            t8_icon = "funnelcloud";
                        }
                        if(cur_wx.search("Blizzard") > -1) {
                            cur_icon = "A_BZ";
                        }

                        var t11_hour = parsed_json['hourly_forecast'][11]['FCTTIME']['hour'];
                        var t11_temp_f = Math.round(parsed_json['hourly_forecast'][11]['temp']['english']);
                        var t11_feel_f = Math.round(parsed_json['hourly_forecast'][11]['feelslike']['english']);
                        var t11_wx = parsed_json['hourly_forecast'][11]['wx'];
                        var t11_icon = parsed_json['hourly_forecast'][11]['icon_url'];
                        t11_icon = t11_icon.substring(28,t11_icon.length-4);
                        var t11_precip = parsed_json['hourly_forecast'][11]['pop'];

                        if(t11_wx.search("Heavy Thunderstorm") > -1) {
                            t11_icon = "heavytstorms";
                        }
                        if(t11_wx.search("Funnel") > -1) {
                            t11_icon = "funnelcloud";
                        }
                        if(cur_wx.search("Blizzard") > -1) {
                            cur_icon = "A_BZ";
                        }

                        if(Math.abs(t11_feel_f-t11_temp_f) > 2 || Math.abs(t8_feel_f-t8_temp_f) > 2 || Math.abs(t5_feel_f-t5_temp_f) > 2 || Math.abs(t2_feel_f-t2_temp_f) > 2 || Math.abs(cur_feel_f-cur_temp_f) > 2) {

                            items += "<td><span style='line-height:50px;' class = 'day'>Now</span><br><img src='icons/" + cur_icon + ".png' width='100px'><span class='precip'><br>";
                            if(t0_precip > 0) {
                                items += t0_precip + '%';
                            }
                            items += "</span><br><span style='line-height:60px;' class='temp'>" + cur_temp_f + "&deg;</span><br><span style='line-height:40px;'>";
                            if(Math.abs(cur_feel_f-cur_temp_f) > 2) {
                                items += "(" + cur_feel_f + "&deg;)</span></td>";
                            } else {
                                items += "&nbsp;</span></td>";
                            }

                            items += "<td><span style='line-height:50px;' class = 'day'>" + t2_hour + "</span><br><img src='icons/" + t2_icon + ".png' width='100px'><br><span class='precip'>";
                            if(t2_precip > 0) {
                               items += t2_precip + "%";
                            }
                            items += "</span><br><span style='line-height:60px;' class='temp'>" + t2_temp_f + "&deg;</span><br><span style='line-height:40px;'>";
                            if(Math.abs(t2_feel_f-t2_temp_f) > 2) {
                                items += "(" + t2_feel_f + "&deg;)</span></td>";
                            } else {
                                items += "&nbsp;</span></td>";
                            }

                            items += "<td><span style='line-height:50px;' class = 'day'>" + t5_hour + "</span><br><img src='icons/" + t5_icon + ".png' width='100px'><br><span class='precip'>";
                            if(t5_precip > 0) {
                               items += t5_precip + "%";
                            }
                            items += "</span><br><span style='line-height:60px;' class='temp'>" + t5_temp_f + "&deg;</span><br><span style='line-height:40px;'>";
                            if(Math.abs(t5_feel_f-t5_temp_f) > 2) {
                                items += "(" + t5_feel_f + "&deg;)</span></td>";
                            } else {
                                items += "&nbsp;</span></td>";
                            }

                            items += "<td><span style='line-height:50px;' class = 'day'>" + t8_hour + "</span><br><img src='icons/" + t8_icon + ".png' width='100px'><br><span class='precip'>";
                            if(t8_precip > 0) {
                               items += t8_precip + "%";
                            }
                            items += "</span><br><span style='line-height:60px;' class='temp'>" + t8_temp_f + "&deg;</span><br><span style='line-height:40px;'>";
                            if(Math.abs(t8_feel_f-t8_temp_f) > 2) {
                                items += "(" + t8_feel_f + "&deg;)</span></td>";
                            } else {
                                items += "&nbsp;</span></td>";
                            }

                        } else {

                            items += "<td><span style='line-height:58px;'>Now</span><br><img src='icons/" + cur_icon + ".png' width='100px'><span style='disply:float;font-size:16px;'><br>";
                            if(t0_precip > 0) {
                                items += t0_precip + '%';
                            }
                            items += "</span><br><span style='line-height:60px;' class='temp'>" + cur_temp_f + "&deg;</span></td>";

                            items += "<td><span style='line-height:58px;'>" + t2_hour + "</span><br><img src='icons/" + t2_icon + ".png' width='100px'><br><span class='precip'>";
                            if(t2_precip > 0) {
                               items += t2_precip + "%";
                            }
                            items += "</span><br><span style='line-height:60px;' class='temp'>" + t2_temp_f + "&deg;</span></td>";

                            items += "<td><span style='line-height:58px;'>" + t5_hour + "</span><br><img src='icons/" + t5_icon + ".png' width='100px'><br><span class='precip'>";
                            if(t5_precip > 0) {
                               items += t5_precip + "%";
                            }
                            items += "</span><br><span style='line-height:60px;' class='temp'>" + t5_temp_f + "&deg;</span></td>";

                            items += "<td><span style='line-height:58px;'>" + t8_hour + "</span><br><img src='icons/" + t8_icon + ".png' width='100px'><br><span class='precip'>";
                            if(t8_precip > 0) {
                               items += t8_precip + "%";
                            }
                            items += "</span><br><span style='line-height:60px;' class='temp'>" + t8_temp_f + "&deg;</span></td>";

                        }

                        items += "</tr>";
                        
                        if(t2_hour < 21 && t2_hour > 6) {
                            // will tag TRUE when current time is 5am to 7pm
                            $("#weather_table").html(items);
                        }



                        var d1_day = parsed_json['forecast']['simpleforecast']['forecastday'][1]['date']['weekday_short'];
                        var d1_high_f = Math.round(parsed_json['forecast']['simpleforecast']['forecastday'][1]['high']['fahrenheit']);
                        var d1_low_f = Math.round(parsed_json['forecast']['simpleforecast']['forecastday'][1]['low']['fahrenheit']);
                        var d1_wx = parsed_json['forecast']['simpleforecast']['forecastday'][1]['conditions'];
                        var d1_icon = parsed_json['forecast']['simpleforecast']['forecastday'][1]['icon'];
                        var d1_pop = parsed_json['forecast']['simpleforecast']['forecastday'][1]['pop'];
                        var d1_rain = parsed_json['forecast']['simpleforecast']['forecastday'][1]['qpf_allday']['in'];
                        var d1_snow = parsed_json['forecast']['simpleforecast']['forecastday'][1]['snow_allday']['in'];

                        var d2_day = parsed_json['forecast']['simpleforecast']['forecastday'][2]['date']['weekday_short'];
                        var d2_high_f = Math.round(parsed_json['forecast']['simpleforecast']['forecastday'][2]['high']['fahrenheit']);
                        var d2_low_f = Math.round(parsed_json['forecast']['simpleforecast']['forecastday'][2]['low']['fahrenheit']);
                        var d2_wx = parsed_json['forecast']['simpleforecast']['forecastday'][2]['conditions'];
                        var d2_icon = parsed_json['forecast']['simpleforecast']['forecastday'][2]['icon'];
                        var d2_pop = parsed_json['forecast']['simpleforecast']['forecastday'][2]['pop'];
                        var d2_rain = parsed_json['forecast']['simpleforecast']['forecastday'][2]['qpf_allday']['in'];
                        var d2_snow = parsed_json['forecast']['simpleforecast']['forecastday'][2]['snow_allday']['in'];

                        var d3_day = parsed_json['forecast']['simpleforecast']['forecastday'][3]['date']['weekday_short'];
                        var d3_high_f = Math.round(parsed_json['forecast']['simpleforecast']['forecastday'][3]['high']['fahrenheit']);
                        var d3_low_f = Math.round(parsed_json['forecast']['simpleforecast']['forecastday'][3]['low']['fahrenheit']);
                        var d3_wx = parsed_json['forecast']['simpleforecast']['forecastday'][3]['conditions'];
                        var d3_icon = parsed_json['forecast']['simpleforecast']['forecastday'][3]['icon'];
                        var d3_pop = parsed_json['forecast']['simpleforecast']['forecastday'][3]['pop'];
                        var d3_rain = parsed_json['forecast']['simpleforecast']['forecastday'][3]['qpf_allday']['in'];
                        var d3_snow = parsed_json['forecast']['simpleforecast']['forecastday'][3]['snow_allday']['in'];

                        if(d1_wx.search("Blizzard") > -1) {
                            d1_icon = "A_BZ";
                        }
                        if(d2_wx.search("Blizzard") > -1) {
                            d2_icon = "A_BZ";
                        }
                        if(d3_wx.search("Blizzard") > -1) {
                            d3_icon = "A_BZ";
                        }

                        var items2 = '<tr>';

                        items2 += "<td><span style='line-height:50px;' class = 'day'>Now</span><br><img src='icons/" + cur_icon + ".png' width='100px'><span class='precip'><br>";
                        if(t0_precip > 0) {
                            items2 += t0_precip + '%';
                        }
                        items2 += "</span><br><span style='line-height:60px;' class='temp'>" + cur_temp_f + "&deg;</span><br><span style='line-height:40px;'>";
                        if(Math.abs(cur_feel_f-cur_temp_f) > 2) {
                            items2 += "(" + cur_feel_f + "&deg;)</span></td>";
                        } else {
                            items2 += "&nbsp;</span></td>";
                        }

                        items2 += "<td><span style='line-height:50px;' class = 'day'>" + d1_day + "</span><br><img src='icons/" + d1_icon + ".png' width='100px'><br><span class='precip'>";
                        if(d1_pop > 0) {
                           items2 += d1_pop + "%";
                        }
                        if(d1_snow > 0) {
                           items2 += ' <img src="/icons/est_snow.png"> ' + d1_snow + '"';
                        } else if (d1_rain > 0) {
                           items2 += ' <img src="/icons/est_rain.png"> ' + d1_rain + '"';
                        }
                        items2 += "</span><br><span style='line-height:60px;' class='temp'>" + d1_high_f + "&deg;</span><br><span style='line-height:40px;'>" + d1_low_f + "&deg;</span></td>";

                        items2 += "<td><span style='line-height:50px;' class = 'day'>" + d2_day + "</span><br><img src='icons/" + d2_icon + ".png' width='100px'><br><span class='precip'>";
                        if(d2_pop > 0) {
                           items2 += d2_pop + "%";
                        }
                        if(d2_snow > 0) {
                           items2 += ' <img src="/icons/est_snow.png"> ' + d2_snow + '"';
                        } else if (d2_rain > 0) {
                           items2 += ' <img src="/icons/est_rain.png"> ' + d2_rain + '"';
                        }
                        items2 += "</span><br><span style='line-height:60px;' class='temp'>" + d2_high_f + "&deg;</span><br><span style='line-height:40px;'>" + d2_low_f + "&deg;</span></td>";

                        items2 += "<td><span style='line-height:50px;' class = 'day'>" + d3_day + "</span><br><img src='icons/" + d3_icon + ".png' width='100px'><br><span class='precip'>";
                        if(d3_pop > 0) {
                           items2 += d3_pop + "%";
                        }
                        if(d3_snow > 0) {
                           items2 += ' <img src="/icons/est_snow.png"> ' + d3_snow + '"';
                        } else if (d3_rain > 0) {
                           items2 += ' <img src="/icons/est_rain.png"> ' + d3_rain + '"';
                        }
                        items2 += "</span><br><span style='line-height:60px;' class='temp'>" + d3_high_f + "&deg;</span><br><span style='line-height:40px;'>" + d3_low_f + "&deg;</span></td>";                    



                        items2 += "</tr>";
                        console.log(items2)
                        if(t2_hour > 20 || t2_hour < 7) {
                            // will tag TRUE when current time is 7pm to 5am
                            $("#weather_table").html(items2);
                        }

                        var current_alerts = parsed_json['alerts'];

                        var items3 = '';

                        console.log(current_alerts);
                        
                        for(i=0; i<current_alerts.length; i++) {
                            var date = new Date(current_alerts[i]['expires_epoch']*1000);
                            var minutes = date.getMinutes();

                            var phen = current_alerts[i]['phenomena'];
                            var sig = current_alerts[i]['significance'];
                            
                            console.log(phen);
                            console.log(sig);

                            if(phen == "SM" || phen == "DU" || phen == "DS" || phen == "AS" || phen == "AF") {
                                phen = "AQ";
                            } else if(phen == "BS" || phen == "BW" || phen == "EW" || phen == "HF" || phen == "HW") {
                                phen = "WI";
                            } else if(phen == "EC" || phen == "FR" || phen == "HZ") {
                                phen = "FZ";
                            } else if(phen == "EH") { 
                                phen = "HT";
                            } else if(phen == "FL" || phen == "HY" || phen == "FA") {
                                phen = "FF";
                            } else if(phen == "HI" || phen == "TI" || phen == "TR" || phen == "TY") { 
                                phen = "HU"; 
                            } else if(phen == "HS" || phen == "LB" || phen == "LE" || phen == "SB" || phen == "SN" || phen == "WW") {
                                phen = "WS"; 
                            } else if(phen == "MA" || phen == "SR") { 
                                phen = "SV"; 
                            } else if(phen == "SU") { 
                                phen = "TS"; 
                            } else if(phen == "UP") { 
                                phen = "IS"; 
                            } else if(phen == "ZF") { 
                                phen = "FG";
                            } else if(phen != "AQ" && phen != "BZ" && phen != "FF" && phen != "FW" && phen !="FZ" && phen != "HT" && phen != "HU" && phen != "IP" && phen != "IS" && phen != "LO" && phen != "SV" && phen != "TO" && phen != "TS" && phen != "WC" && phen != "WI" && phen != "WS" && phen != "ZR" && phen != "FG") {
                                phen = "LO";
                                sig = "W";
                            }          

                            var weekday = new Array(7);
                            weekday[0]=  "Sun";
                            weekday[1] = "Mon";
                            weekday[2] = "Tue";
                            weekday[3] = "Wed";
                            weekday[4] = "Thu";
                            weekday[5] = "Fri";
                            weekday[6] = "Sat";
                            
                            var long_weekday = new Array(7);
                            long_weekday[0]=  "Sunday";
                            long_weekday[1] = "Monday";
                            long_weekday[2] = "Tuesday";
                            long_weekday[3] = "Wednesday";
                            long_weekday[4] = "Thusday";
                            long_weekday[5] = "Friday";
                            long_weekday[6] = "Saturday";

                            if(sig == "W"){
                                //var audio = new Audio('alert.mp3');
                                
                                items3 += "<span style='background-color: yellow; color: black;font-size: 38px;'><div style='height: 100px;width: 100px;background-color: yellow;'>";
                                //responsiveVoice.speak("Please stand by, a weather alert will follow the following tone.", "UK English Male", {rate: 0.8});
                                //setTimeout(function(){audio.play();}, 10000);
                                
                                //audio.play();
                                
                                //var alert_speak = "Attention. Attention. A " + current_alerts[i]['description'] + ". Is now in effect. " + current_alerts[i]['message'] + "Once again. A " + current_alerts[i]['description'] + ". Is now in effect.";
                                
                                //setTimeout(function(){responsiveVoice.speak(alert_speak, "UK English Male", {rate: 1.0});}, 24000);
                                scrollText = '<marquee style="font-family: Roboto, calibri, sans-serif; background-color: rgba(255,255,0,1.0); font-weight: 600; width: 95%; color: rgba(0,0,0,0.5); position: absolute; bottom: 2.5%; left: 2.5%; right: 2.5%; z-index: 99; font-size: 26px; padding: 4px 4px 4px 4px;" behavior="scroll" direction="left">' + current_alerts[i]['message'] + '</marquee>';
                                                                
                            } else {
                                items3 += "<span style='background-color: blue; color: white; font-size: 38px;'><div style='height: 100px;width: 100px;background-color: blue;'>";
                                sig = "A";
                            }

                            items3 += "<img src='icons/" + sig + "_" + phen + ".png' width='100px'></div>";

                            items3 += "&nbsp;<b>" + current_alerts[i]['description'] + "</b>&nbsp;<br>&nbsp;<i>until " + date.getHours();

                            if(minutes < 10) {
                                items3 += ":0" + date.getMinutes() + " " + weekday[date.getDay()] + "</i>&nbsp;</span><span style='font-size: 15px;line-height: 15px;'><br>";
                            } else {
                                items3 += ":" + date.getMinutes() + " " + weekday[date.getDay()] + "</i>&nbsp;</span><span style='line-height: 15px;font-size: 15px;'><br>";
                            }
                            
                            if(i == current_alerts.length-1) {
                                items3 += '<br></span>';
                            } else {
                                items3 += '<br><br></span>';
                            }
                        }
                        if (items3.length > 0) {
                            $("#weather").html(items3)
                        }
                        //document.getElementById("wxAlertScroll").innerHTML = scrollText;

                    }
                });
            });
        };
        
        getWeather();    
        setInterval(getWeather, 600000); 
