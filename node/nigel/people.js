var utils = require('../nigel/utils');
var request = require('request');
var natural = require('natural');
var courses = require('../nigel/mit').courses;
var w3 = require('../nigel/mit').w3
metaphone = natural.Metaphone; 
soundEx = natural.SoundEx;

var certain = ["I believe ", "I'm fairly certain ", "I think ", "", ""];
var dontKnow = ["Nope, I don't know ", "Sorry, I don't know ", "I don't know much about ", "I don't know enough about "];
var tellMeMore = ["Perhaps you can tell me more about this person.", "Please tell me about this person.", "Why don't you tell me more about this person."];

var ambiguous  = [ "josh", "david" ];


function match(person, tokens) {
	for (var i in ambiguous) {
		if (person == ambiguous[i]) {
			return "{error} I know too many " + person + "'s. Please be more specific."; 
		}
	}
	var i; var matched = false;
	for (var i in w3) {
		var nicknames = w3[i][1];
		for (var n in nicknames) {
			if ( utils.similar( person.replace(/\s/g,""), nicknames[n].replace(/\s/g, ""), 0.95 ) || 
				 metaphone.compare(nicknames[n].replace(/\s/g,""), person.replace(/\s/g,"")) ) 
			{
				console.log("matched: ", nicknames[n]);
				matched = true; break;
			}
		}
		if (matched) break;
	}
	return matched ? i : false
}

function query(person, tokens) {
	var result = new Object();
	var person = person.replace(/\{\}/, "");
	var response = ""; var confidence = 0; var matched = false; var i;

	for (i in w3) {
		var nicknames = w3[i][1];
		for (var n in nicknames) {
			if ( utils.similar( person.replace(/\s/g,""), nicknames[n].replace(/\s/g, ""), 0.95 ) || 
				 metaphone.compare(nicknames[n].replace(/\s/g,""), person.replace(/\s/g,"")) ) 
			{
				console.log("matched: ", nicknames[n]);
				matched = true; break;
			}
		}
		if (matched) {
			response = [ w3[i][0] + " is a " + w3[i][2] + " at M.I.T." ];
			if (w3[i][3]) {
				response[0] = response[0] + ", majoring in Course " + w3[i][3] + ": " + courses[w3[i][3]];
			}
			if (w3[i][4][0]) {
				response.push(w3[i][4][0]);
			} else {
				response.push("Would you like to tell me more about " + w3[i][0] + "?");
			}
			break;
		}
	}

	if (matched) {
		personal = w3[i][7] || [];
		personal.push("Would " + w3[i][0] + " like to give Baymax a hug?");
		personal.push("I know you're a " + w3[i][2] + " at M.I.T., studying " + (courses[w3[i][3]] || "underwater basket-weaving") + ".");
	    result = {
	        response: response,
	        confidence: 1,
	        kerberos: i,
	        name: w3[i][0],
	        title: w3[i][2], 
	        course: courses[w3[i][3]],
	        birthday: w3[i][5],
	        hometown: w3[i][6],
	        personal: personal
	    }
	} else {
	    result.response = response || [utils.random(dontKnow) + person + ". ", utils.random(tellMeMore)];
	    result.confidence = confidence;
	}

	for (var i in ambiguous) {
		if (person == ambiguous[i]) {
			result.response = "I know too many " + person + "'s. Please be more specific.";
			result.confidence = 1;
		}
	}

	return result;
}


function queryBirthday(person, tokens) {
	var result = new Object();
	response = ""; confidence = 0;

	for (var i in ambiguous) {
		if (person == ambiguous[i]) {
			confidence = 1;
			response = "I know too many " + person + "'s. Please be more specific."; 
		}
	}

	var matched = false
	for (var i in w3) {
		var nicknames = w3[i][1];
		for (var n in nicknames) {
			if ( utils.similar( person.replace(/\s/g,""), nicknames[n].replace(/\s/g, ""), 0.95 ) || 
				 metaphone.compare(nicknames[n].replace(/\s/g,""), person.replace(/\s/g,"")) ) 
			{
				console.log("matched: ", nicknames[n]);
				matched = true; break;
			}
		}
		if (matched) {
			response = w3[i][5] ? utils.random(certain) + w3[i][0] + "'s birthday is " + w3[i][5] : "Sorry, I don't think I know " + w3[i][0] + "'s birthdate."
			break;
		}
	}
	result.response = response;
	result.confidence = confidence;
	return result;
}

function queryHometown(person, tokens) {
	var result = new Object();
	response = ""; confidence = 0;

	for (var i in ambiguous) {
		if (person == ambiguous[i]) {
			confidence = 1;
			response = "I know too many " + person + "'s. Please be more specific."; 
		}
	}

	var matched = false
	for (var i in w3) {
		var nicknames = w3[i][1];
		for (var n in nicknames) {
			if ( nicknames[n].replace(/\s/g, "") == person.replace(/\s/g, "") || 
				 metaphone.compare(nicknames[n].replace(/\s/g,""), person.replace(/\s/g,"")) ) 
			{
				console.log("matched: ", nicknames[n]);
				matched = true; break;
			}
		}
		if (matched) {
			response = w3[i][6] ? utils.random(certain) + w3[i][0] + " is from " + w3[i][6] : "Sorry, I don't think I know " + w3[i][0] + "'s hometown.";
			break;
		}
	}
	result.response = response;
	result.confidence = confidence;
	return result;
}

exports.query = query;
exports.match = match;
exports.birthday = queryBirthday;
exports.hometown = queryHometown;