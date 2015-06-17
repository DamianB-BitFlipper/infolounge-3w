var request = require("request");
var Firebase = require('firebase');
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");
var utils = require("../nigel/utils");
var people = require("../nigel/people");
var parse = require("xml2js").parseString;
var randomResponses = require('../nigel/random').randomResponses;

function clean(s) {
    patterns = new Array();
    patterns[0] = /~~/
    patterns[1] = /Wolfram/
    patterns[2] = /Alpha/
    patterns[3] = /Stephen/
    patterns[4] = /a computational knowledge engine/
    patterns[5] = /\(([^()]|(R?))*\)/g
    patterns[6] = /\n/g
    patterns[7] = /s \| /g
    patterns[8] = / \| /g
    patterns[9] = /°F/g
    patterns[10] = /country is/

    replacements = new Array()
    replacements[0] = "approximately"
    replacements[1] = ""
    replacements[2] = " Beymax "
    replacements[3] = " Safety Third "
    replacements[4] = " your personal healhcare assistant."
    replacements[5] = ""
    replacements[6] = ". "
    replacements[7] = "s are: "
    replacements[8] = " is: "
    replacements[9] = "degrees fahrenheit "
    replacements[10] = "of"

    for (var i in patterns) {
        s = s.replace(patterns[i], replacements[i]);
    }
    return s.trim();
}

function query(input, s_input, tokens, sms, res) {
    var response = "";
    var command = "";
    var followup = "";
    var media = "";

    nigelRef.update({
        req: input,
        std: s_input,
        res: utils.random(randomResponses.processing),
        followup: "",
        media: "",
        sms: true,
        cmd: ""
    });

    if (s_input.indexOf("weather") > -1) {
        input = "weather";
        s_input = "weather";
        command = "show weather";
    }
    if (s_input.match(/(who|what) {be} /)) {
        input = utils.math(s_input).replace(/({tell} )?(who|what) {be} /, "")
    }

    var wolframURL = "http://api.wolframalpha.com/v2/query?input=" + encodeURIComponent(input) + "&appid=JR95G7-RR7AHKXET4&location=boston,ma"

    request(wolframURL, function(e, r, xml) {
        if (e || r.statusCode != 200) {
            console.log("Connection error");
            response = utils.random(randomResponses.dontKnow);
            o = {
                req: input,
                std: s_input,
                res: response,
                followup: "",
                sms: sms,
                cmd: "",
                media: ""
            };
            nigelRef.update(o);
            res.json(o);
        } else {

            parse(xml, function(err, result) {

                if (err) { response = ""; console.log("XML parse error"); }

                else if (result.queryresult.$.success)
                    try {
                        var pods = result.queryresult.pod;
                        console.log(pods);
                        var pod = pods[0];
                        var matched = false;
                        for (var i in pods) {
                            var title = pods[i].$.title.toLowerCase().split(" ");
                            if (utils.contains(title, "result response statement derivative integral approximation description properties facts weather leadership")) {
                                pod = pods[i];
                                matched = true;
                                break;
                            }
                        }
                    } catch (e) {
                       response = "";
                    }
                else {
                    console.log(result);
                }
                if (matched) {
                    try {
                        response = clean(utils.math(utils.after(pod.subpod[0].plaintext[0], "=")));
                        console.log(title + ": " + response);
                        if (utils.contains(title, "approximation")) {
                            response = "approximately " + response.substring(0, 10);
                        }
                        if (utils.contains(title, "facts")) {
                            var facts = pod.subpod[0].plaintext[0].split(/(\n|\.|\,) /g);
                            console.log("facts: " + facts)
                            response = "";
                            i = -1;
                            while (response.length <= 75 && i++ < facts.length) {
                                response += (facts[i].trim()) ? ". " + clean(facts[i]) : "";
                            }
                            response = response.substring(2);
                        }
                        if (response.length <= 50) {
                            if (s_input.match(/(what|who) {be} /)) {
                                response = utils.random(randomResponses.highConfidence) + input + " is: " + response;
                            }
                        } else if (response.length <= 200) {
                            if (s_input.match(/(what|who) {be} /)) {
                                response = utils.random(randomResponses.lowConfidence) + input + ": " + response;
                            }
                        } else {
                            response = "";
                        }
                    } catch (e) {
                        console.log(e);
                        response = "";
                    }
                }

                // map directions
                if ( /where {be} /.test(s_input) && !response) {
                    var destination = utils.after(s_input, "where {be} ");
                    response = ["Okay, Beymax will pull up directions from Next House to " + destination + " on info lounge.", 
                                "Let me know if you want to go somewhere else."];
                    media = { type: "map", 
                              link: "https://www.google.com/maps/embed/v1/directions?origin=Next+House,+Memorial+Drive,+Cambridge,+MA,+United+States&destination=" + destination.replace(/\s/g, "+") + ",+near+Cambridge,+MA&key=AIzaSyDrATZhqJcmBUE700msJtCWFOe96FIVsx8"
                            }
                    command = "show map";
                }

                if (!response) {
                    if (Math.random() < 0.33) {
                        r = utils.random(randomResponses.helpful);
                        response = r[0];
                        followup = r[1] || "";
                    } else if (Math.random() < 0.5) {
                        response = utils.random(randomResponses[tokens[0]])
                        followup = (Math.random() < 0.5) ? utils.random(randomResponses.unsatisfied) : "";
                    } else {
                        response = utils.random(randomResponses.dontKnow);
                        followup = (Math.random() < 0.5) ? utils.random(randomResponses.unsatisfied) : "";
                    }
                }

                o = {
                    req: input,
                    std: s_input,
                    res: response,
                    followup: followup,
                    cmd: command,
                    sms: sms,
                    media: media
                };
                nigelRef.update(o);

                res.json(o);
            });
        }
    });

}

exports.query = query;