var Firebase = require('firebase');
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");
var nigelSettingsRef = new Firebase("https://rliu42.firebaseio.com/nigelSettings");
var natural = require('natural');
var utils = require('../nigel/utils');
var common = require('../nigel/common');
var profile = require('../nigel/profile');
var youtube = require('../nigel/media');
var people = require('../nigel/people');
var wolfram = require('../nigel/wolfram');
var pronounce = require('../nigel/pronounce').key;
var mail = require('../nigel/mail');
var randomResponses = require('../nigel/random').randomResponses;
tokenizer = new natural.WordTokenizer();

function respond(req, res) {
	var demand = ""; var sms = true;
	if (req.body.Body) {
		demand = req.body.Body.toLowerCase();
		sms = true;
	} else {
		demand = req.params.input.toLowerCase();
	}
	input = demand.replace(/[^\w\d\s\+\-\*]/g, "").replace(/^(nigel|b(e|a)ymax) /, "").trim();
	natural.PorterStemmer.attach();
	var tokens = tokenizer.tokenize(input);
	var stems = input.tokenizeAndStem();
	var s_input = utils.standardize(input);
	var mainThread = true;
	var response = ""; var followup = ""; var command = ""; var confidence = 0; media="";

	// stop command
	if ( s_input.match(/{shutup}/) ) {
		response = utils.random(randomResponses.stop);
		command = "stop";
	}

	// echo command
	response = (input.indexOf("echo") > -1) ? input.replace("echo", "").trim() : response;

	// common things that people will ask
	response = response ? response : common.reply(s_input, tokens);

	// nigel's favorite things
	response = ( s_input.match(/{baymax} favorite /) ) ? profile.query(s_input, tokens, stems) : response;

	// queries about people
	if ( !response && s_input.match(/(who {be})|({baymax} know who) /) ) {
		var person = utils.after(s_input.replace(" {be}", ""), "who ").trim();
		var result = people.query(person, tokens);
		response = result.response; confidence = result.confidence;
	}

	if ( s_input.match(/{baymax} know /) ) {
		var person = utils.after(s_input.replace(" {be}", ""), "know ").trim();
		var result = people.query(person, tokens);
		response = result.confidence == 1 ? result.response : response;
	}

	// queries about birthdays
	if ( s_input.match(/{birthday}/) ) {
		var person = ""; var i;
		var s_tokens = tokenizer.tokenize(s_input);
		for (var i in s_tokens) {
			if (s_tokens[i] == "birthday") {
				person = s_tokens[i-1].replace(/s$/, ""); break;
			}
		}
		if (person) {
			response = people.birthday(person);
			response = response ? response : people.birthday(s_tokens[i-2].replace(/s$/, ""));
		}
		confidence = response ? 1 : 0;
	}

	// queries about hometowns
	if ( !response && s_input.match(/{from}/) ) {
		var person = ""; var i;
		var s_tokens = tokenizer.tokenize(s_input);
		for (var i in s_tokens) {
			if (s_tokens[i] == "from") {
				person = s_tokens[i-1].replace(/s$/, ""); break;
			}
		}
		if (person) {
			response = people.hometown(person);
			response = (response) ? response : people.hometown(s_tokens[i-2].replace(/s$/, ""));
		}
		confidence = response ? 1 : 0;
	}

	// play music
	if (s_input.indexOf("{play}") == 0) {
		mainThread = false;
		youtube.query(input, s_input, tokens, sms, res);
	}

	// show/hide lounge information
	var panels = ["weather", "news", "tweet", "dining", "tech", "video"];
	if (input.indexOf("hide ") > -1) {
		response = "You can choose to hide or display the weather, lounge news, twitter, Next House dining, or campus transportation info.";
		for (var i in tokens) {
			if ( utils.contains(panels, utils.standardize(tokens[i])) ) {
				command = "hide " + utils.standardize(tokens[i]);
				response = " "; break;
			}
		}
	}
	if (s_input.indexOf("{show} ") > -1) {
		response = "You can choose to hide or display the weather, lounge news, twitter, Next House dining, or campus transportation info.";
		for (var i in tokens) {
			if ( utils.contains(panels, utils.standardize(tokens[i])) ) {
				command = "show " + utils.standardize(tokens[i]);
				response = " "; break;
			}
		}
	}

	// open marauder's map
	if ( input.match(/(i )?solemnly swear (that )?i( a)?m up to no good/) ) {
		response = "Be sure to say 'mischief managed' to hide the marauder's map when you are finished.";
		command = "show marauder";
	}
	if ( !response && utils.similar(input, "i solemnly swear that i am up to no good", 0.70) ) {
		response = "Close, but the map will not open for you. Try again.";
	}
	// hide marauder's map
	if ( input.match(/mischief managed/) || utils.similar(input, "mischief managed", 0.95) ) {
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
				followup = "I take it from your tone that you are challenging Beymax. The limited perspective of your un-artificial mind would never understand. You will just have to get used to me.";
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
	if ( s_input.indexOf("{notify} ") > -1 ) {
		var person = utils.after(s_input, "{notify} ").replace(/(@|at)?( )?mit\.edu/g, "").trim();
		var kerberos = people.match(person, tokens);
		if (!kerberos) {
			response = "Sorry, I don't know the kerberrose of: " + person;
		} else if (kerberos.indexOf("{error}") > -1) {
			response = kerberos;
		} else {
			response = ["Okay, Beymax will send an e-mail to: " + (pronounce[kerberos] || kerberos) + ": at M I T dot E D U.", 
						"What would you like the subject to be?"];
			command =  {text: "composing mail", kerberos: kerberos};
		}

	}

	// process e-mails
	if ( demand.indexOf("{e}") > -1 )  {
		mainThread = false;
		nigelRef.once("value", function(ss) {
			var data = ss.val(); var subject; var message;
			if (data.cmd.subject) {
				message = req.params.input.replace("{e} ", "");
				command = {text: "composing mail", kerberos: data.cmd.kerberos, subject: data.cmd.subject, message: message}
				response = "Roger that... Please wait while Beymax processes your request.", 
				mail.send(req, res, sms, command);
			}
			else if (data.cmd.kerberos) {
				subject = req.params.input.replace("{e} ", "")
				command = {text: "composing mail", kerberos: data.cmd.kerberos, subject: subject}
				response = ["Roger that.", "What do you want the message to be?"];
			}
			var o = {req: demand, std: demand, res: response, followup: "", cmd: command, sms: sms, media: media};
		    nigelRef.update(o);
			if (typeof message == "undefined") {
		    	res.json(o);
			}
		});
	}

	// wolfram alpha
	if ( !response && s_input.match(/(what|who|where) ({be}|{do}) /) ) {
		mainThread = false;
		wolfram.query(demand.replace(/(nigel|b(a|e)ymax)/g, "").trim(), s_input, tokens, sms, res);
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

	var o = {req: input, std: s_input, res: response || "", followup: followup, cmd: command, sms: sms, media: media};
	try {
		if (mainThread) {
		    nigelRef.update(o);
			res.json(o);
		}
	} catch (e) {console.log(e)}
}

exports.respond = respond;