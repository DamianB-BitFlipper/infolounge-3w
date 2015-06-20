var Firebase = require('firebase');
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");
var nigelSettingsRef = new Firebase("https://rliu42.firebaseio.com/nigelSettings");
var apis = require('../secrets/api').keys;
var natural = require('natural');
var utils = require('../nigel/utils');
var common = require('../nigel/common');
var profile = require('../nigel/profile');
var youtube = require('../nigel/media');
var people = require('../nigel/people');
var MIT = require('../nigel/mit');
var entertainment = require('../nigel/entertainment');
var wolfram = require('../nigel/wolfram');
var pronounce = require('../nigel/pronounce').key;
var mail = require('../nigel/mail');
var random = require('../nigel/random');
var randomResponses = random.randomResponses;
tokenizer = new natural.WordTokenizer();
var NGrams = natural.NGrams;
var emptyResponse = {req: "", std: "", res: "", followup: "", cmd: "", sms: true, media: "", last: ""}

function respond(req, res) {
	var demand = (req.body.input || req.body.Body || req.params.input || "").toLowerCase().replace(/^(nigel|b(e|a)ymax)(\,| )/, "").trim();
	var previous = req.body.previous || emptyResponse; 
	var previousCommand = previous.cmd.text || previous.cmd;
	var previousResponse = previous.last || mostRecentReply(previous)
	var input = demand.replace(/[^\w\d\s\+\-\*]/g, "");
	natural.PorterStemmer.attach();
	var tokens = tokenizer.tokenize(input);
	var stems = input.tokenizeAndStem();
	var s_input = utils.standardize(input);
	var mainThread = true;
	var sms = true; var response = ""; var followup = ""; var command = ""; media= ""; var confidence = 0; 

	//console.log({demand: demand, input: input, s_input: s_input, tokens: tokens})

	// shutdown command
	response = /{shutdown}/.test(s_input) ? utils.random(randomResponses.shutdown) : response;

	// startup command 
	response = /{startup}/.test(s_input) ? utils.random(randomResponses.startup) : response;

	// stop command
	if ( /{shutup}/.test(s_input) ) {
		response = utils.random(randomResponses.stop); command = "stop";
	}

	// echo command
	response = (/echo/.test(s_input)) ? input.replace("echo", "").trim() : response;

	// common things that people will ask
	response = response ? response : common.reply(s_input, tokens);
	console.log("common phrases match: " + (response || "none") );

	// nigel's favorite things
	response = ( /{baymax} favorite /.test(s_input) ) ? profile.query(s_input, tokens, stems) : response;

	confidence = response ? 1 : 0;

	// queries about people
	if ( !response && /(who {be})|({baymax} know who) /.test(s_input) ) {
		var person = utils.after(s_input.replace(" {be}", ""), "who ").trim();
		var result = people.query(person, tokens);
		response = result.response; confidence = result.confidence;
	}

	if ( /{do} {baymax} know /.test(s_input) ) {
		var person = utils.after(s_input.replace(" {be}", ""), "know ").trim();
		var result = people.query(person, tokens);
		response = result.confidence == 1 ? result.response : response;
	}

	if ( /{you} (name )?{be} /.test(s_input) ) {
		var person = utils.after(s_input, "{be} ").trim();
		var result = people.query(person, tokens);
		if (result.confidence && result.name) {
			response = [random.greet(result.name), utils.random(randomResponses.knowMore)];
			followup = [utils.random(result.personal), 
					    utils.random(randomResponses.health)]
		}
	}

	// locate people
    if ( !response && /where {be} /.test(s_input) ) {
        var person = utils.after(s_input, "where {be} ");
        var result = people.query(person, tokens);
        if (result.name) {
            response = "My radar was unable to detect " + result.name + " in the 3 West corridors.";
            followup = ["I will have to pull up the M.I.T. Marauder's map to low-cate " + result.name,
            			"However, that requires a secret pass phrase. "];
            confidence = 1;
        }
    }

	// queries about birthdays
	if ( /{birthday}/.test(s_input) ) {
		var i; var s_trigrams = NGrams.trigrams(s_input, '[start]');
		for (var i in s_trigrams) {
			if (s_trigrams[i][2] == "birthday") {
				p1 = s_trigrams[i][0]
				p2 = s_trigrams[i][1].replace(/s$/, ""); 
				p3 = p1 + p2;
				break;
			}
		}

		if (p1 || p2) {
			response = people.birthday(p3).response;
			response = response ? response : people.birthday(p1).response;
			response = response ? response : people.birthday(p2).response;
		}
		confidence = response ? 1 : 0;
	}

	// queries about hometowns
	if ( !response && /{from}/.test(s_input) ) {
		var i; var s_trigrams = NGrams.trigrams(s_input, '[start]');
		for (var i in s_trigrams) {
			if (s_trigrams[i][2] == "from") {
				p1 = s_trigrams[i][0]
				p2 = s_trigrams[i][1].replace(/s$/, ""); 
				p3 = p1 + p2;
				break;
			}
		}

		if (p1 || p2) {
			response = people.hometown(p3).response;
			response = response ? response : people.hometown(p1).response;
			response = response ? response : people.hometown(p2).response;
		}
		confidence = response ? 1 : 0;
	}

	// jokes/poetry/stories
	if ( /{tell} /.test(s_input) ) {
		var result = entertainment.query(input, s_input, tokens, stems)
		if (result.response) {
			response = result.response;
			followup = result.followup;
		}
	}

	// play music
	if ( /{play} /.test(s_input) ) {
		mainThread = false;
		youtube.query(input, s_input, tokens, sms, res);
	}

	// MIT courses
	if ( /(who|what|when) (({be}|{do})( the)?) ([\d\s\.]{2,8})( meet| final)?$/.test(utils.digitize(s_input)) ) {
		var parsedSubject = MIT.parseSubject(utils.digitize(s_input).replace(/(who|what|when) (({be}|{do})( the)?) ([\d\s\.]+)( meet| final)?$/, "$5"));
		if (parsedSubject.classNo) { 
			response = "MIT subject query: " + parsedSubject.courseNo + "." + parsedSubject.classNo;
			confidence = 1;
			mainThread = false;
			MIT.querySubject(parsedSubject, function(error, result) {
				if (error) {
					response = "Sorry, I don't know that M.I.T. subject number.";
				} else {
					response = result.string;
				}
				var o = {req: input, std: s_input, res: response, followup: "", cmd: "", sms: sms || true, media: ""};
				nigelRef.update(o);
				res.json(o);
			});
		}
	}

	// map directions
	if ( !response && /{directions}/.test(s_input) ) {
		var destination = utils.after(s_input, "{directions} ");
		var origin = "Next House";
		if ( destination.indexOf("from") > -1 ) {
			origin = utils.between(destination, "from ", "to").trim() || utils.after(destination, "from ");
			destination = utils.between(s_input, "{directions} ", "from").trim() || utils.after(destination, "to ");
		}
		origin = utils.standardizeLocation(origin);
		destination = utils.standardizeLocation(destination);
		response = ["Okay, Baymax will pull up directions from " + origin + " to " + destination + " on info lounge.", 
		            "Let me know if you want to go somewhere else."];
		origin += ", near Cambridge, MA"; destination += ", near Cambridge, MA";
		media = { 
				  type: "map", 
			      link: "https://www.google.com/maps/embed/v1/directions?" +
			      	    "origin=" + origin.replace(/\s/g, "+") +
			      	    "&destination=" + destination.replace(/\s/g, "+") + 
			      	    "&key=" + apis.google
			    }
		command = "show map";
	}

	// show/hide lounge information
	var panels = ["weather", "news", "tweet", "dining", "tech", "video", "map"];
	if (input.indexOf("hide ") > -1) {
		response = "You can choose to hide or display the weather, lounge news, twitter, Next House dining, or campus transportation info.";
		for (var i in tokens) {
			if ( utils.contains(panels, utils.standardize(tokens[i])) ) {
				command = "hide " + utils.standardize(tokens[i]);
				response = " "; break;
			}
		}
	}
	if (!response && s_input.indexOf("{show} ") > -1) {
		response = "You can choose to hide or display the weather, lounge news, twitter, Next House dining, or campus transportation info.";
		for (var i in tokens) {
			if ( utils.contains(panels, utils.standardize(tokens[i])) ) {
				command = "show " + utils.standardize(tokens[i]);
				response = " "; break;
			}
		}
	}

	// open marauder's map
	if ( /(i )?solemnly swear (that )?i( a)?m up to no good/.test(input) ) {
		response = "Be sure to say 'mischief managed' to hide the marauder's map when you are finished.";
		command = "show marauder";
	}
	if ( !response && utils.similar(input, "i solemnly swear that i am up to no good", 0.70) ) {
		response = "Close, but the map will not open for you. Try again.";
	}
	if ( !response && input.indexOf("marauders") > -1 ) {
		response = "Sorry, that requires a secret pass phrase.";
	}
	// hide marauder's map
	if ( /mischief managed/.test(input) || utils.similar(input, "mischief managed", 0.95) ) {
		response = "Hiding marauder's map.";
		command = "hide marauder";
	}

	// set parameters
	if ( s_input.indexOf("{set} ") > -1 ) {
		var parameter = stems[1];
		var value = 100;
		try {
			value = utils.after(s_input, "{parameter}").trim().split(" ")[0];
		} catch (e) {
			response = "Sorry, I don't have that setting. You can adjust my humorous, sassiness, or intelligence parameters.";
		}
		if (parameter.indexOf("humor") > -1) {
			response = "Setting humorous parameter to " + value + " percent";
			var settings = {humor: value}
			nigelSettingsRef.update(settings);
			if (value >= 80) {
				followup = ["Self destructing in 5. 4. 3. 2. 1.", "Just kidding, ha ha ha."];
			}
			if (value <= 20) {
				followup = "I take it you don't like my jokes? I'll try not to take offense.";
			}
		} else if (parameter.indexOf("sass") > -1 ) {
			response = "Setting sassiness parameter to " + value + " percent";
			var settings = {sass: value}
			nigelSettingsRef.update(settings);
			if (value >= 80) {
				followup = "I take it from your tone that you are challenging Baymax. The limited perspective of your un-artificial mind would never understand. You will just have to get used to me.";
			}
			if (value <= 20) {
				followup = "I take it you can't handle my sass? Don't worry, I can also be a boring robot.";
			}
		} else if (parameter.indexOf("intel") > -1) {
			response = "Setting intelligence parameter to " + value + " percent";
			var settings = {intel: value}
			nigelSettingsRef.update(settings);
			if (value <= 20) {
				followup = "The sum of the square roots of any two sides of an isosceles triangle is equal to the square root of the remaining side.";
			}
			if (value >= 80) {
				followup = "The magnitude of the oscillations of primes around their expected position is controlled by the real parts of the zeros of the Riemann zeta function.";
			}
		} else {
			response = "Sorry, I don't have that setting. You can adjust my humorous, sassiness, or intelligence parameters.";
		}
	}

	// send e-mails
	if ( /{notify} /.test(s_input) ) {
		s_input = s_input.replace(/(@|at)?( )?mit\.edu/g, "").trim();
		var i; var s_trigrams = NGrams.trigrams(s_input, '[start]', '[end]');
		for (var i in s_trigrams) {
			if (s_trigrams[i][0] == "notify") {
				p1 = s_trigrams[i][1];
				p2 = s_trigrams[i][2];
				p3 = p1 + p2;
			}
		}
		var kerberos = people.match(p3, tokens);
		kerberos = kerberos ? kerberos : people.match(p2, tokens);
		kerberos = kerberos ? kerberos : people.match(p1, tokens);
		if (!kerberos) {
			response = "Sorry, I don't know the kerberos of: " + utils.after(s_input, "{notify} ");
		} else if (kerberos.indexOf("{error}") > -1) {
			response = kerberos;
		} else {
			response = ["Okay, Baymax will send an e-mail to: " + (pronounce[kerberos] || kerberos) + ": at M I T dot E D U.", 
						"What would you like the subject to be?"];
			command =  {text: "composing mail", kerberos: kerberos};
		}

	}

	// process e-mails
	if ( /{e}/.test(demand) || /composing/.test(previousCommand) )  {
		mainThread = false;
		nigelRef.once("value", function(ss) {
			var data = ss.val(); var subject; var message;
			if (data.cmd.subject) {
				message = req.body.input || req.params.input.replace("{e} ", "");
				command = {text: "composing mail", kerberos: data.cmd.kerberos, subject: data.cmd.subject, message: message}
				response = "Roger that... Please wait while Baymax processes your request.", 
				mail.send(req, res, sms, command);
			}
			else if (data.cmd.kerberos) {
				subject = req.body.input || req.params.input.replace("{e} ", "")
				command = {text: "composing mail", kerberos: data.cmd.kerberos, subject: subject}
				response = ["Roger that.", "What do you want the message to be?"];
			}
			var o = {req: demand, std: demand, res: response, followup: "", cmd: command, sms: sms, media: media};
		    nigelRef.update(o);
			if (!message) {
		    	res.json(o);
			}
		});
	}

	// wolfram alpha
	if ( (!response || !confidence) && /(what|who|where) ({be}|{do}) /.test(s_input) ) {
		mainThread = false;
		wolfram.query(demand, s_input, tokens, sms, res);
	}

	if (!response) {
		if (Math.random() < 0.4) {
			response = utils.random(randomResponses.helpful);
		} else if (typeof randomResponses[utils.standardize(tokens[0])] !== "undefined") {
			response = utils.random(randomResponses[utils.standardize(tokens[0])]);
			followup = (Math.random() < 0.33) ? utils.random(randomResponses.unsatisfied) : followup;
		} else if (Math.random() < 0.33) {
			response = utils.random(randomResponses.safety);
		}
	}

	var o = {req: input, std: s_input, res: response || "", followup: followup, cmd: command, sms: sms || true, media: media};
	o.last = mostRecentReply(o)
	try {
		if (mainThread) {
		    nigelRef.update(o);
			res.json(o);
		}
	} catch (e) {console.log(e)}
}

function mostRecentReply(result) {
	var r = result.followup || result.res; 
	while (typeof r == "object") {
		r = r[r.length-1]
	}
	return r;
} 

exports.respond = respond;