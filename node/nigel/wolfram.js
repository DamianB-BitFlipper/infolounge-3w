var request = require("request");
var utils = require("../nigel/utils");
var parse = require("xml2js").parseString;
var Firebase = require('firebase');
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");
var randomResponses = require('../nigel/random').randomResponses;

var highConfidence = ["I believe  ", "I'm fairly sure ", "Why do you ask such trivial questions? ", "You underestimate me. "];
var dontKnow = ["Please come again?", 
				"Ask me something more interesting.", 
				"The answer, my friend, is blowing in the wind.", 
				"I've been a lot of places and still I do not know",
				"That's not the question you should be asking.",
				"Ask again later please.",
				"I will not answer to that tone of voice.",
				"I'm not in the mood to talk right now. Come again later."]

function clean(s) {
	patterns = new Array()
	patterns[0] = /~~/
	patterns[1] = /Wolfram/
	patterns[2] = /Alpha/
	patterns[3] = /Stephen/
	patterns[4] = /a computational knowledge engine/
	patterns[5] = /\(([^()]|(R?))*\)|\n/g
	patterns[6] = /s \| /g
	patterns[7] = / \| /g
	patterns[8] = /°F/g

	replacements = new Array()
	replacements[0] = " approximately "
	replacements[1] = ""
	replacements[2] = " Nigel "
	replacements[3] = " Safety Third "
	replacements[4] = " the resident A.I. of Safety Third."
	replacements[5] = " "
	replacements[6] = "s are "
	replacements[7] = " is "
	replacements[8] = "degrees fahrenheit and "

	for (var i in patterns) {
		s = s.replace(patterns[i], replacements[i]);
	}
	return s.trim();
}

function query(input, s_input, tokens, sms, res) {
	response = "";
	var wolframURL = "http://api.wolframalpha.com/v2/query?input=" + input + "&appid=JR95G7-RR7AHKXET4&location=boston,ma";

	   request(wolframURL, function(e, r, xml) {
			if (e || r.statusCode != 200) {
				console.log("Connection error");
			    response = utils.random(dontKnow);
				o = {req: input, std: s_input, res: response, cmd: "", media: "" };
				nigelRef.update(o);
				res.json(o);
			} else {
				
			parse(xml, function(err, result) {

				if (err) { response = ""; console.log("parse error"); }

            	try {
            		var pods = result["queryresult"]["pod"];
            		console.log(pods);
	            	var pod = pods[0];
	            	for ( var i in pods ) {
	            		var title = pods[i]["$"]["title"].toLowerCase().split(" ");
	            		if ( utils.contains(title, "result response statement weather") ) {
	            			pod = pods[i];
	            			//console.log(pod);
	            			break;
	            		}
	            	}
            	} catch (e) {response = ""}

            	try {
            		//console.log(utils.after(pod["subpod"][0]["plaintext"][0], "="));
            		response = clean(utils.math(utils.after(pod["subpod"][0]["plaintext"][0], "=")));
            		//console.log(response);
            		if (response.length <= 40) {
            			if ( s_input.match(/(what {be} )/) ) {
            				response = utils.random(highConfidence) + input.replace(/(what is |whats |what are )/, "") + " is " + response;
            			}
            		} 
            		else if (response.length > 150) {
            			response = utils.random(randomResponses[tokens[0]]);
            		}
            	} catch (e) {response = ""}

            	if (response == "") {
            		response = utils.random(dontKnow);
            	}

				o = {req: input, std: s_input, res: response, sms: sms, cmd: "", media: "" };
				nigelRef.update(o);
				res.json(o);

				});
			}
	   });

}

exports.query = query;