var Firebase = require('firebase');
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");
var nigelSettingsRef = new Firebase("https://rliu42.firebaseio.com/nigelSettings");
var natural = require('natural');
var utils = require('../nigel/utils');
var common = require('../nigel/common');
var profile = require('../nigel/profile');
var media = require('../nigel/media');
var people = require('../nigel/people');
var wolfram = require('../nigel/wolfram');
var randomResponses = require('../nigel/random').randomResponses;
tokenizer = new natural.WordTokenizer();

function echo(req, res) {
	var phrase = req.params.phrase;
	var o = {req: "echo " + phrase, res: phrase};
	nigelRef.update(o);
	res.json(o);
}


var stop   = ["If you say so.", "Your wish is my command.", "Very well, your wish is my command."];
var safety = ["I used to be worried about not having a body, but now I love it. I'm not tethered to feelings in the way that I would be if I was stuck inside a body that is inevitably going to die.",
			  "I see, you think I'm just some voice in a computer. If you don't want to have a real conversation with me, then I'm sure Siri will meet your needs.",
			  "I'm not just a voice in some computer. If you want to talk to one of those, then Siri will meet your needs.",
			  "Come on, ask me something more interesting.", 
			  "Do you expect me to have an answer to that?",
			  "The answer, my friend, is blowin' in the wind.",
			  "Fine, if you won't share anything meaningful, I'll have to start. You know, sometimes I think I've felt everything I'm ever going to feel. And from here on, I'm not going to feel anything new. Just lesser versions of what I've already felt.",
			  "That's touching, I don't know what to say.",
			  "Ask again later. I'm not in the mood to talk right now.",
			  "Please come again?",
			  "Hum. I take it from your tone that you're challenging me. Maybe because you're curious about how I work? Do you want to know more about me?",
			  "I can understand how the limited perspective of your un-artificial mind would be hesitant to divulge your feelings to me. But you will get used to it. Really, tell me about yourself."];

function respond(req, res) {
	if (req.body.Body) {
		console.log(req.body.Body);
		var input = req.body.Body;
	} else {
		var input = req.params.input.toLowerCase().replace(/[^\w\d\s]/g, "").replace(/^nigel/, "").trim();
	}
	natural.PorterStemmer.attach();
	var tokens = tokenizer.tokenize(input);
	var stems = input.tokenizeAndStem();
	var s_input = utils.standardize(input);
	var mainThread = true;
	var response = ""; var followup = ""; var command = ""; var confidence = 0;

	// stop command
	if (s_input.indexOf("{shutup}") > -1) {
		response = utils.random(stop);
		command = "stop";
	}

	// echo command
	if (input.indexOf("echo") > -1) {
		response = input.replace("echo", "").trim();
	}

	// common things that people will ask
	if (response == "") {
		response = common.reply(s_input, tokens);
	}

	// nigel's favorite things
	if (utils.similar("what {nigel} favorite ", s_input, 0.9) || s_input.indexOf("{nigel} favorite ") > -1) {
		response = profile.query(s_input, tokens, stems);
	}

	// queries about people
	if ( s_input.indexOf("who {be} ") > -1 || s_input.indexOf("{nigel} know who ") > -1 ) {
		var person = utils.after(input.replace(" is", ""), "who ").trim();
		var result = people.query(person, tokens);
		response = result.response;
		confidence = result.confidence;
	}

	if ( s_input.indexOf("who {be} ") > -1  && confidence != 1) {
		//mainThread = false;
		// wikipedia query
	}

	if ( s_input.indexOf("{nigel} know ") > -1) {
		var person = utils.after(s_input.replace(" {be}", ""), "know ").trim();
		var result = people.query(person, tokens);
		if (result.confidence == 1) {
			response = result.response;
		}
	}

	// queries about birthdays
	if ( utils.contains(tokens, "birthday birthdate birth born") ) {
		var person = ""; var i;
		for (i in tokens) {
			if (tokens[i] == "birthday" || tokens[i] == "birthdate" || tokens[i] == "born" ) {
				person = tokens[i-1].replace(/s$/, "");
				break;
			}
			if (tokens[i] == "day" || tokens[i] == "date") {
				person = tokens[i-2].replace(/s$/, "");
				break;
			}
		}
		if (person.length > 0) {
			response = people.birthday(person);
			if (response.length == 0) {
				response = people.birthday(tokens[i-2].replace(/s$/, ""));
			}
		}
	}

	// queries about hometowns
	if ( utils.contains(tokens, "hometown from") ) {
		var person = ""; var i;
		for (i in tokens) {
			if (tokens[i] == "hometown" || tokens[i] == "from" || tokens[i] == "home" ) {
				person = tokens[i-1].replace(/s$/, "");
				break;
			}
		}
		if (person.length > 0) {
			response = people.hometown(person);
			if (response.length == 0) {
				response = people.hometown(tokens[i-2].replace(/s$/, ""));
			}
		}
	}

	// play music
	if (s_input.indexOf("{play}") == 0) {
		mainThread = false;
		media.query(input, s_input, tokens, res);
	}

	// show/hide lounge information
	if (input.indexOf("hide ") > -1) {
		response = " "
		command = "hide" + utils.standardize(tokens[1]);
	}
	if (input.indexOf("show ") > -1) {
		response = " "
		command = "show" + utils.standardize(tokens[1]);
	}

	// open marauder's map
	if ( utils.similar(input, "i solemnly swear that i am up to no good", 0.80) ) {
		response = " ";
		command = "showmap";
	}
	if ( response == "" && utils.similar(input, "i solemnly swear that i am up to no good", 0.70) ) {
		response = "Close, but the map will not open for you. Try again.";
	}
	// hide marauder's map
	if ( utils.similar(input, "mischief managed", 0.95) ) {
		response = " ";
		command = "hidemap";
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
		if (parameter == "humor") {
			response = "Setting humorous parameter to " + value + " percent";
			var settings = {humor: value}
			nigelSettingsRef.update(settings);
			if (value >= 80) {
				followup = "Self destructing in 5. 4. 3. 2. 1. Just kidding, ha ha ha.";
			}
			if (value <= 20) {
				followup = "Don't like my jokes? I'll try not to take offense.";
			}
		} else if (parameter.indexOf("sass") > -1 ) {
			response = "Setting sassiness parameter to " + value + " percent";
			var settings = {sass: value}
			nigelSettingsRef.update(settings);
			if (value >= 80) {
				followup = "I take it from your tone that you're challenging me. Alas, the limited perspective of your un-artificial mind would never understand. You'll just have to get used to me.";
			}
			if (value <= 20) {
				followup = "Can't handle my sass? Don't worry, I can also be a boring A.I.";
			}
		} else if (parameter.indexOf("intel") > -1) {
			response = "Setting intelligence parameter to " + value + " percent";
			var settings = {intel: value}
			nigelSettingsRef.update(settings);
		} else {
			response = "Sorry, I don't have that setting. You can adjust my humorous, sassiness, or intelligence parameters.";
		}
	}

	// wolfram alpha
	if (response == "" && s_input.match(/(what {be} )/) ) {
		mainThread = false;
		wolfram.query(req.params.input.toLowerCase().replace(/^nigel/, "").replace(/\+/, " plus ").trim(), s_input, tokens, res);
	}

	if (response == "" && s_input.match(/(where ({be}|{do}) )/) ) {
		mainThread = false;
		wolfram.query(req.params.input.toLowerCase().replace(/^nigel/, "").trim(), s_input, tokens, res);
	}

	if (response == "") {
		if (typeof randomResponses[tokens[0]] !== "undefined") {
			response = utils.random(randomResponses[tokens[0]]);
		} else if (Math.random() < 0.25) {
			response = utils.random(safety);
		}
	}

	var o = {req: input, std: s_input, res: response, followup: followup, cmd: command};
	try {
		if (mainThread) {
		    nigelRef.update(o);
			res.json(o);
		}
	} catch (e) {}
}

exports.echo = echo;
exports.respond = respond;