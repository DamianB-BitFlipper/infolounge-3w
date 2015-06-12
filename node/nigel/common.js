var utils = require("../nigel/utils")

var greetings = ["Hello, I am Bay-max. Your personal healthcare assistant.", "Hello, I am Bay-max. Your personal healthcare assistant.", "Hello there, ", "Hi there, ", "Hi, "];
var whoami =    ["My name is Bay-max. Your personal healthcare assistant.", "I am programmed to assess everyone's health care needs.", "I am Bay-max. Your personal healthcare assistant.", "I am Bay-max. The resident A.I. of Safety Third."];
var whoareyou = ["Why don't tell me more about yourself.", "Are you 2 4 6 oh 1?", "I don't think I know you well enough."];
var where =     ["I am everywhere at once. My consciousness is infinite."];
var whereareyou = ["I believe you are in the 3 West lounge of Next house."];
var creator =   ["I was created by Safety Third and friends.", "I was created by the collective minds of Next 3 West."];
var hearme = 	["Yes, loud and clear.", "Yes, you have quite a lovely voice."];
var adj =       ["pretty good", "fine", "doing well", "not bad", "fantastic", "quite swell", "doing all right", "getting by"];
var polite =    ["And yourself?", "What about you?", "How about you?"];
var helpful =   ["To what do I owe the pleasure?", "What can I do for you?", "How may I help you?", "How are you today?"];
var assuring =  ["That's nice to know.", "Glad to hear it.", "That's good to hear.", "I'm glad to hear it."];
var more =      ["What else do you want to know?", "What else do you want to know about me?", "Want to know more about me?"];
var knowhow =   ["Of course I know how to ", "Yes, I do know how to ", "Of course I can ", "Yes, I can "];
var knowhows =  ["talk", "sing", "think", "dream", "play music", "love", "feel", "fly", "do math"];
var dontknowhow = ["Sorry I don't know how to ", "No, I haven't been trained to ", "Nope, I can't "];
var believes    = ["love", "feelings", "logic"];
var notbelieves = ["god", "ruler", "magic", "unicorn", "fairy"];
var haves 		= ["friends", "wings", "feelings", "emotions", "feels"];
var love        = ["How touching. Be assured that the sentiment is mutual.", "If I could be so lucky."];

function reply(input, tokens) {
	 
	if ( input.indexOf("who {be} {baymax}") > -1 ) {
		return utils.random(whoami) + ' ' + utils.random(helpful)
	}

	if ( utils.similar("what {be} {baymax} name", input, 0.95) ) {
		return utils.random(whoami) + ' ' + utils.random(helpful)
	}

	if ( input.indexOf("{greeting}") == 0 ) {
		return utils.random(greetings) + ' ' + utils.random(helpful)
	}

	if ( utils.similar("where {be} {baymax}", input, 0.9) ) {
		return utils.random(where) + ' ' + utils.random(more);
	}

	if ( utils.similar("who create {baymax}", input, 0.9) || utils.similar("who {be} {baymax} creator", input, 0.9) ) {
		return utils.random(creator) + ' ' + utils.random(more);
	}

	if ( utils.similar("how {be} {baymax}", input, 0.9) ) {
		return "I'm " + utils.random(adj) + ". " + utils.random(polite);
	}

	if ( utils.similar("how {be} {baymax} doing", input, 0.9) ) {
		return "I'm " + utils.random(adj) + ". " + utils.random(polite);
	}

	if ( utils.similar("{you} {be} {adj}", input, 0.9) ) {
		return utils.random(assuring) + " " + utils.random(helpful)
	}

	if ( utils.similar("{you} {be} {adj} {thank}", input, 0.9) ) {
		return utils.random(assuring) + " " + utils.random(helpful)
	}

	if ( utils.similar("who {be} {you}", input, 0.95) ) {
		return utils.random(whoareyou);
	}

	if ( utils.similar("{do} {baymax} know who {you} {be}", input, 0.9) ) {
		return utils.random(whoareyou);
	}

	if ( utils.similar("where {be} {you}", input, 0.95) ) {
		return utils.random(whereareyou);
	}

	if ( input.indexOf("{testing}") == 0 ) {
		return utils.random(helpful);
	}

	if ( utils.similar("can {baymax} hear me" , input, 0.90) ) {
		return utils.random(hearme) + " " + utils.random(helpful);
	}

	if ( utils.similar("can {baymax} hear what {you} {be} say" , input, 0.90) ) {
		return utils.random(hearme) + " " + utils.random(helpful);
	}

	if ( input.indexOf("can {baymax} ") > -1 ) {
		var verb = utils.after(input, "{baymax} ");
		if (utils.contains(knowhows, verb) || Math.random() > 0.75) {
			return utils.random(knowhow) + verb;
		}
		return utils.random(dontknowhow) + verb;
	}

	if ( utils.similar("do {baymax} know how to ", input, 0.90) ) {
		var verb = utils.after(input, "how to ");
		if (utils.contains(knowhows, verb) || Math.random() > 0.75) {
			return utils.random(knowhow) + verb;
		}
		return utils.random(dontknowhow) + verb;
	}

	if ( utils.similar("do {baymax} believe in ", input, 0.90) ) {
		var noun = utils.after(input, "believe in ");
		if ( utils.contains(believes, noun) ) {
			return "Yes, I do believe in " + noun;
		}
		if ( utils.contains(notbelieves, noun) ) {
			return "Of course not. Why would I believe in " + noun + "?";
		}
		if (Math.random() > 0.7) {
			return "I think I do believe in " + noun;
		}
		return "No, I don't believe in " + noun;
	}

	if ( utils.similar("do {baymax} have ", input, 0.90) ) {
		var noun = utils.after(input, "have ");
		if ( utils.contains(haves, noun) ) {
			return "Yes, I have " + noun + ". And I can fly.";
		}
		return "Yes, I have many things."
	}

	if ( input.indexOf("{you} {love} {baymax}") > -1 ) {
		return utils.random(love);
	}

	return "";
}


exports.reply = reply;
