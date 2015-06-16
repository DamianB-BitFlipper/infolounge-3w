var utils = require("../nigel/utils")
var randomResponses = require("../nigel/random").randomResponses;
var greetings = [ ["Hello.", "I am Beymax. Your personal safety and healthcare companion."], ["Hello.", "I am Beymax. Your personal healthcare companion."], "Hello there, ", "Hi there, ", "Hi, "];
var whoami =    [ ["My name",  "is Beymax. Your personal safety and healthcare companion."], "I am programmed to assess everyone's safety, and healthcare needs.", "I am Beymax. Your personal healthcare companion.", "I am Beymax. The resident A.I. of Safety Third."];
var whoareyou = ["Why don't you tell me more about yourself.", "Are you 2 4 6 oh 1?", "I don't think I know you well enough."];
var whereami =    ["I am everywhere at once. My consciousness is infinite."];
var whereareyou = ["I believe you are in the 3 West lounge of Next house."];
var creator =   ["I was created by Safety Third and friends.", "I was created by the collective minds of Next 3 West."];
var hearme = 	["Yes, loud and clear.", "Yes, you have quite a lovely voice."];
var adj =       ["pretty good", "fine", "doing well", "not bad", "fantastic", "quite swell", "doing all right", "getting by"];
var polite =    ["And yourself?", "What about you?", "How about you?"];
var helpful =   ["To what do I owe the pleasure?", "What can I do for you?", "How may I help you?", "What can I do for you today?", "Would you like to tell me your name?", "And what is your lovely name?", "You can start by telling me your name."];
var assuring =  ["That's nice to know.", "Glad to hear it.", "That's good to hear.", "I'm glad to hear it."];
var more =      ["What else do you want to know about Beymax?", "What else do you want to know about me?", "Do you want to know more about me?"];
var knowhow =   ["Of course I can ", "Yes, Beymax does know how to ", "Why, of course I can ", "Yes, Beymax can "];
var dontknowhow = ["Sorry I don't know how to ", "No, Beymax has not been trained to ", "Nope, Beymax can't "];
var knowhows =  ["talk", "sing", "think", "dream", "play music", "love", "feel", "fly", "do math", "speak", "send", "dance"];
var believes    = ["love", "feelings", "logic"];
var notbelieves = ["god", "ruler", "magic", "unicorn", "fairy"];
var haves 		= ["friends", "wings", "feelings", "emotions", "feels"];
var love        = ["How touching. Be assured that the sentiment is mutual.", "If I could be so lucky.", "Sorry, love is closed door for me."];

function reply(input, tokens) {

	if (input == "{baymax}") {
		return utils.random(helpful);
	}
	 
	if ( input.match(/wh(o|at) {be} {baymax}$/) ) {
		return [utils.random(whoami), utils.random(helpful)];
	}

	if ( utils.similar("what {be} {baymax} name", input, 0.95) ) {
		return [utils.random(whoami), utils.random(helpful)]
	}

	if ( input.match(/^{greeting}/) ) {
		return [utils.random(greetings), utils.random(helpful)]
	}

	if ( input.match(/where ({be}|{do}) {baymax}/) || utils.similar("where {be} {baymax}", input, 0.95) ) {
		return [utils.random(whereami),  utils.random(more)];
	}

	if ( utils.similar("who create {baymax}", input, 0.9) || utils.similar("who {be} {baymax} creator", input, 0.9) ) {
		return [utils.random(creator), utils.random(more)];
	}

	if ( tokens[0] == "how" && utils.similar("how {be} {baymax}", input, 0.95) ) {
		return ["I'm " + utils.random(adj), utils.random(polite)];
	}

	if ( tokens[0] == "how" && utils.similar("how {be} {baymax} doing", input, 0.95) ) {
		return ["I'm " + utils.random(adj), utils.random(polite)];
	}

	if ( utils.similar("{you} {be} {adj}", input, 0.9) ) {
		return [utils.random(assuring), utils.random(helpful)];
	}

	if ( utils.similar("{you} {be} {adj} {thank}", input, 0.9) ) {
		return [utils.random(assuring), utils.random(helpful)];
	}

	if ( tokens[0] == "who" && utils.similar("who {be} {you}", input, 0.95) ) {
		return utils.random(whoareyou);
	}

	if ( utils.similar("{do} {baymax} know who {you} {be}", input, 0.9) ) {
		return utils.random(whoareyou);
	}

	if ( tokens[0] == "where" && utils.similar("where {be} {you}", input, 0.95) ) {
		return utils.random(whereareyou);
	}

	if ( tokens[0] == "what" && utils.similar("what can {baymax} {do}", input, 0.95) ) {
		return utils.random(randomResponses["helpful"]);
	}

	if ( input.indexOf("{testing}") == 0 ) {
		return utils.random(helpful);
	}

	if ( utils.similar("can {baymax} hear me" , input, 0.90) ) {
		return [utils.random(hearme), utils.random(helpful)];
	}

	if ( utils.similar("can {baymax} hear what {you} {be} say" , input, 0.90) ) {
		return [utils.random(hearme), utils.random(helpful)];;
	}

	if ( input.indexOf("can {baymax} ") > -1 ) {
		var verb = utils.after(input, "{baymax} ");
		if (utils.contains(knowhows, verb) || Math.random() > 0.75) {
			return utils.random(knowhow) + verb + ".";
		}
		return utils.random(dontknowhow) + verb + ".";
	}

	if ( input.indexOf("do {baymax} know how to ") > -1 ) {
		var verb = utils.after(input, "how to ");
		if (utils.contains(knowhows, verb) || Math.random() < 0.25) {
			return [utils.random(knowhow) + verb, "I can do many other things as well."];
		}
		return [utils.random(dontknowhow) + verb, "But I can do many other things."];
	}

	if ( utils.similar("do {baymax} believe in ", input, 0.90) ) {
		var noun = utils.after(input, "believe in ");
		if ( utils.contains(believes, noun) ) {
			return "Yes, I do believe in " + noun + ".";
		}
		if ( utils.contains(notbelieves, noun) ) {
			return "Of course not. Why would I believe in " + noun + "?";
		}
		if (Math.random() > 0.7) {
			return "I think I do believe in " + noun + ".";
		}
		return "No, I don't believe in " + noun + ".";
	}

	if ( input.indexOf("do {baymax} have ") > -1 ) {
		var noun = utils.after(input, "have ");
		if ( utils.contains(haves, noun) ) {
			return "Yes, I have " + noun + ". And I can fly.";
		}
		return "Yes, I have many things."
	}

	if ( input.indexOf("{you} {love} {baymax}") > -1 ) {
		return utils.random(love);
	}

	if ( utils.similar(input, "{be} {baymax} satisfied with", 0.9) ) {
		return ["Very funny. That's my question to ask.", "Tell me. Are you satisfied with your care?"];
	}

	if ( utils.similar(input, "{you} {be} satisfied with", 0.9) ) {
		return ["I'm delighted to hear that!", "Would you like a loving hug from Beymax?"]
	}

	if (input.match(/hairy baby/)) {
		return ["Hairy baby!", ["Hairy baby!", "Hairy baby!"]];
	}

	if (input.match(/window/)) {
		return "Weee jumped out a window!";
	}

	if (input.match(/ hug(s)?($| )/)) {
		return ["Beymax loves hugs!", "Would you like to give Beymax a hug?"];
	}

	if (input.indexOf("insult") > -1) {
		return [utils.random(randomResponses["sad"]), utils.random(randomResponses["insult"])]
	}

	if (input.indexOf("health") > -1) {
		return [utils.random(randomResponses["health"]), "Are you satisfied with your care?"]
	}

	return "";
}

exports.reply = reply;
