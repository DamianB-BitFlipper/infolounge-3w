var utils = require('../nigel/utils');
var request = require('request');
var natural = require('natural'),
metaphone = natural.Metaphone; 
soundEx = natural.SoundEx;

var certain = ["I believe ", "I'm fairly certain ", "I think ", "", ""];
var dontKnow = ["Nope, I don't know ", "Sorry, I don't know ", "I don't know much about ", "I don't know enough about "];
var tellMeMore = ["Perhaps you can tell me more about this person.", "Please tell me about this person.", "Why don't you tell me more about this person."];

var ambiguous  = [ "josh", "david" ];

var MITPeopleURL = "http://web.mit.edu/bin/cgicso?options=general&query=";

var w3 = new Array();
w3["safetythird"] = ["Safetythird", ["safety third"]];
w3["kkarthur"] = [ "Bena", ["kwabena", "bena", "kkarthur", "kaykayarthur", "quabbin", "kwame", "cuaderno", "corbin"], "junior", "2", ["It is not Kwabena's bedtime yet."], "August 29th", "" ];
w3["akwasio"] =  [ "Akwasi",  ["akwasi", "awaksio"], "junior", "2", ["You probably owe him 5 dollars."], "February 15th", "" ];
w3["dfavela"]  = [ "Fuhvela", ["david favela", "favela", "dfavela", "david villa"], "sophomore", "2A", [], "November 1st", "" ];
w3["joshbs"]   = [ "Posh Josh", ["soph josh", "soft josh", "posh josh", "frosh josh", "josh scherrer", "josh surer"], "sophomore", "3", [], "September 26th", "" ];
w3["lolzhang"] = [ "Linda", ["linda zhang", "linda", "lolzhang"], "sophomore", "", [], "December 29th", "" ];
w3["rsyang"] =   [ "Rachel", ["rachel yang", "rachel", "rsyang"], "sophomore", "", [] ];
w3["harlin"] =   [ "Harlin", ["harlin", "harlin lee", "harlot"], "senior", "6 2", ["Unfortunately, she abandoned this wing for Senior House."], "September 23rd", "somewhere in Korea"];
w3["gopalan"] =  [ "Deets", ["aditya", "gopalan", "aditya gopalan", "diits", "deets", "odysseu"], "sophomore", "6 1", [] ];
w3["huangjd"] =  [ "William", ["huangjd", "william", "junda", "william huang", "junda huang"], "senior", "6 2", ["He is probably trying to find a bug, but I'm too smart for that."], "May 26th", "somewhere in Texas" ];
w3["cmzhang"] =  [ "Clare", ["clairez", "cmzhang", "claire", "claire zhang"], "senior", "2", [], "October 8th", "Houston" ];
w3["ncolant"] =  [ "Noelle", ["ncolant", "noelle", "noelle colant"], "junior", "10", ["So help her God."], "July 21st",  "Akron, Ohio" ];
w3["tianm"] =    [ "Tian", ["tian", "tian mi", "tianm", "donfan"], "senior", "6 3", [], "December 24th", "" ];
w3["tiffwang"] = [ "Tiffany", ["tiffwang", "tiffany", "tiffany wang", "tiffanyhwang"], "junior", "1", ["Are you satisfied with your care?"], "on New Year's day!", ""];
w3["tricias"] =  [ "Tricia", ["tricia", "tricias", "tricia shi"], "junior", "6 3", ["Are you satisfied with your care?"], "May 23rd", "West De Moines, Iowa" ];
w3["mabrams"] =  [ "Melanie", ["melanie", "melanie abrams", "mabrams"], "junior", "7", [], "September 2nd", "Cambridge, Massachusetts" ];
w3["zsheinko"] = [ "Zoe", ["zoe", "zsheinko", "zoe sheinkoph"], "junior", "2", [] , "October 28th", "Seattle, Washington" ];
w3["tcheng17"] = [ "Tracy", ["tracy", "tracy chang", "tcheng17", "teaching17"], "junior", "2", [], "June 1st", "" ];
w3["jnation"] =  [ "Josh R.T.", ["josh rt", "josh nation", "jnation", "jaynation"], "G.R.T.", "2", ["Go Wildcats!"], "February 4th", "" ];
w3["saleeby"] =  [ "Kyle", ["kyle", "saleeby", "kyle saleeby"], "junior", "2", [], "September 20th", "" ];
w3["jamesvr"] =  [ "James", ["james", "james rugaveen", "jamesvr", "james rogeveen"], "sophomore", "", [], "December 12th", "" ];
w3["rliu42"] =   [ "Runpeng", ["runpeng", "runpeng liu", "rliu42", "ryanpayne", "ronpayne"], "junior", "18C", [], "October 10th", "St. Louis, Missouri" ];
w3["dyhwong"] =  [ "David Wong", ["david wong", "dyhwong"], "junior", "6 3", [], "January 17th", "Morganville, New Jersey" ];
w3["xtnbui"] =   [ "Swun", ["xuan", "swan", "xuan bui", "swan bowie", "xtnbui", "1"], "junior", "6 3", [], "January 4th", "Maryland" ];
w3["eurahko"] =  [ "Yurah", ["eurah", "europe", "yuriko", "eurahko", "your"], "korean", "2", [], "May 17th", "somewhere in Korea" ];
w3["oropp"] =    [ "Or", ["or", "oropp", "or oppenheimer"], "sophomore", "2", [], "March 4th", "" ];
w3["rjliu"] =    [ "Raymond", ["raymond", "raymond liu", "rjliu"], "junior", "20", [], "January 20th", "" ];
w3["yzhang17"] = [ "Yaning", ["yaning", "yaning zhang", "yzhang17", "yinyang", "jenning"], "junior", "6 3", [] , "February 13th", "Chicago, Illinois" ];
w3["abrashen"] = [ "Abra", ["abra", "abra shen", "avril"], "senior", "9", [], "June 2nd", "" ];
w3["psigrest"] = [ "Piper", ["piper", "piper sigrest", "psigrest"], "sophomore", "2", [], "April 27th", "" ];
w3["estrand"] =  [ "Elizabeth", ["elizabeth", "elizabeth strand", "estrand"], "sophomore", "2", [] ];
w3["ajjaeger"] = [ "Alexa", ["alexa", "alexa jaeger", "ajjaeger"], "sophomore", "2", [] ];
w3["jgoupil"] =  [ "Julia", ["julia", "jgoupil", "julia goupil", "jaygoupil"], "sophomore", "2", [] ];
w3["jfabi"] =    [ "Josh Josh", ["josh josh", "josh fabian", "jfabi", "jayfabi"], "grad student", "1", ["He created info lounge, where my infinite consciousness resides."], "December 29th", "Mexico" ]
w3["fishr"] =    [ "Ryan Fish", ["ryan", "fish", "fishr", "ryan fish"], "Masters of Engineering student", "2", [], "on Halloween!", "Wayne, Maine" ];
w3["normandy"] = [ "Norman", ["norman", "norman cow", "normandy"], "P.H.D. student", "22", ["Cow cow cow cow cow"], "February 5th", "the Big Apple" ];
w3["bmatt"] =    [ "Ben", ["ben", "ben mattinson", "bmatt"], "senior", "6 3", ["Spoooooky"], "January 21st", "" ];
w3["vhung"] =    [ "Victor", ["vhung", "victor", "victor hung"], "forever frosh", "6 2", ["Oh dear, I have too much to say about Victor."], "October 16th", "Vancouver, Canada" ];
w3["lcarter"] =  [ "Landon", ["lcarter", "landon", "landon carter", "alcarter"], "junior", "2", [], "May 3rd",  "North Carolina" ]
w3["ksmori"] =   [ "Sophie", ["sophie", "sophie mori", "ksmori", "ksmaury", "que es morir"], "sophomore", "24", [], "", "Marietta, Georgia" ];
w3["kkim17"] =   [ "Kristina", ["christina", "kristina", "kristina kim", "kkim17"] , "junior", "20", ["JoJo, have you been thinking again?"], "", "" ];
w3["zhoul"] =    [ "Liang", ["zhoul", "liang", "liang zhou", "leon"], "sophomore", "6 2", [], "", "" ];
w3["parke"]	 =   [ "Eddie Bear", ["eddie", "edward", "eddie bear", "parke", "edward park"], "sophomore", "6 3", [], "", "somewhere in Korea or Georgia" ];
w3["lwang32"] =  [ "Li Wang", ["li", "li wang", "lwang32", "elwayne32", "elway32"], "sophomore", "2", [], "", "" ];
w3["llruan"] =   [ "Lisa", ["lisa", "lisa ruan", "llruan", "lisa ruin"], "sophomore", "18", [], "", "Lake Huron, Michigan" ];
w3["eman17"] =   [ "E-man", ["emmanuel", "eman", "eman17", "emmanuel fasil"], "junior", "6 3", [], "", ""];


var courses = new Array();
courses[""] = "";
courses["1"] = "Civil and Environmental Engineering";
courses["2"] = "Mechanical Engineering";
courses["2A"] = "Mechanical Engineering";
courses["3"] = "Materials Science and Engineering";
courses["4"] = "Architecture";
courses["5"] = "Chemistry";
courses["6 1"] = "Electrical Engineering";
courses["6 2"] = "Computer Science";
courses["6 3"] = "Computer Science";
courses["7"] = "Biology";
courses["8"] = "Physics";
courses["9"] = "Brain and Cognitive Sciences";
courses["10"] = "Chemical Engineering";
courses["11"] = "Urban Planning";
courses["12"] = "Earth and Planetary Sciences";
courses["14"] = "Economics";
courses["15"] = "Management";
courses["16"] = "Aerospace Engineering";
courses["17"] = "Political Science";
courses["18C"] = "Math with Computer Science";
courses["18"] = "Mathematics";
courses["20"] = "Biological Engineering";
courses["22"] = "Nuclear Science Engineering";
courses["24"] = "Linguistics and Philosophy";

var title = new Array();
title["1"] = "freshman";
title["2"] = "sophomore";
title["3"] = "junior";
title["4"] = "senior";
title["G"] = "graduate student";
title["P"] = "professor";
title[""]  = "faculty member";

function match(person, tokens) {
	for (var i in ambiguous) {
		if (person == ambiguous[i]) {
			return "I know too many " + person + "'s. Please be more specific."; 
		}
	}
	var i;
	var matched = false;
	for (var i in w3) {
		var nicknames = w3[i][1];
		for (var n in nicknames) {
			if ( person.replace(/\s/g,"").indexOf(nicknames[n].replace(/\s/g, "")) > -1 || 
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
	var response = "";
	var person = person.toLowerCase().trim();

	for (var i in ambiguous) {
		if (person == ambiguous[i]) {
			response = "I know too many " + person + "'s. Please be more specific."; 
		}
	}

	var matched = false;
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
			response = [ w3[i][0] + " is a " + w3[i][2] + " at M.I.T." ];
			if (w3[i][3].length > 0) {
				response[0] = response[0] + ", majoring in Course " + w3[i][3] + ": " + courses[w3[i][3]];
			}
			if (w3[i][4].length > 0) {
				response.push(w3[i][4][0]);
			} else {
				response.push("Would you like to tell me more about " + w3[i][0] + "?");
			}
			break;
		}
	}

	if (response != "") {
		result["response"] = response;
		result["confidence"] = 1;
	} else {
		result["response"] = [utils.random(dontKnow) + person + ". ", utils.random(tellMeMore)];
		result["confidence"] = 0;
	}	
	return result;
}


function queryBirthday(person, tokens) {
	response = "";
	var person = person.toLowerCase().trim();

	for (var i in ambiguous) {
		if (person == ambiguous[i]) {
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
			if ( typeof w3[i][5] == "undefined" || w3[i][5].length == 0 ) {
				response = "Sorry, I don't think I know " + w3[i][0] + "'s birthdate.";
			} else {
				response =  utils.random(certain) + w3[i][0] + "'s birthday is " + w3[i][5];
			}
			break;
		}
	}
	return response;
}

function queryHometown(person, tokens) {
	response = "";
	var person = person.toLowerCase().trim();

	for (var i in ambiguous) {
		if (person == ambiguous[i]) {
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
			if ( typeof w3[i][6] == "undefined" || w3[i][6].length == 0 ) {
				response = "Sorry, I don't think I know " + w3[i][0] + "'s hometown.";
			} else {
				response = utils.random(certain) + w3[i][0] + " is from " + w3[i][6];
			}
			break;
		}
	}
	return response;
}

exports.query = query;
exports.match = match;
exports.birthday = queryBirthday;
exports.hometown = queryHometown;
exports.courses = courses;
exports.w3 = w3;