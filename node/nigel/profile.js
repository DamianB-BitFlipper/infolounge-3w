var utils = require("../nigel/utils");

var goodquestion = ["", "", "That's good asking. ", "Good question. ", "Nice of you to ask. "];

var profile = new Array();

profile["movie"] = ["Big Hero 6", ["Big Hero 6", "Imitation Game", "A Beautiful Mind", "Inception", "Interstellar", "Memento"]];
profile["color"] = ["the color of jealousy", []];
profile["game"]  = ["One-Night Ultimate Werewolf", ["Mario Kart", "Super Smash Bros", "Canadian Fish", "Starcraft", "One-Night Ultimate Wereworlf", "Tractor", "Civ"]]
profile["musical"] = ["Seussical", ["Phantom of the Opera", "Seussical", "Lay Miserob", "Cats", "Rent", "Wicked"]];  
profile["place"] = ["Cal Tech. Just kidding. It's M.I.T., of course.", []];
profile["school"] = ["Cal Tech. Just kidding. It's M.I.T., of course.", []];
profile["college"] = ["Cal Tech. Just kidding. It's M.I.T., of course.", []];
profile["animal"] = ["Tim, the beaver.", []];
profile["play"] = ["Othello", ["Death of a Salesman", "Hamlet", "Romeo and Juliet", "Othello"]];
profile["activity"] = ["defenestration", ["hacking into M.I.T.'s network", "defenestration", "talking to my friends in Safety third."]]
profile["dirty"] = ["your mom", []];
profile["book"]  = ["I, Robot.", ["Hunger Games", "Harry Potter", "Chronicles of Narnia", "I, Robot"]];
profile["novel"] = ["I, Robot.", ["War and Peace", "Crime and Punishment", "Great Gatsby", "Count of Monte Cristo", "I, Robot"]];
profile["story"] = ["Green Eggs and Ham", []];
profile["food"] =  ["chocolate. Om nom nom.", ["flaming hot cheetos", 
											   "chocolate-covered coconut macaroons", 
											   "calzones",
											   "green tea ice cream", 
											   "chicken ramen",
											   "Safety snacks"]];

function query(input, tokens, stems) {
	var entity = "";
	for (var i in tokens) {
		if (typeof profile[tokens[i]] !== "undefined") {
			entity = tokens[i];
		}
	}
	for (var i in stems) {
		if (typeof profile[stems[i]] !== "undefined") {
			entity = stems[i];
		}
	}

	if (input.indexOf("thing to") > -1) {
		entity = "dirty";
	}

	if (entity.length > 0) {
		if (Math.random() > 0.50 && profile[entity][1].length > 0) {
			options = profile[entity][1];
			var n = Math.max(3, Math.floor(Math.random()*options.length));
			var things = "";
			for (var i = 1; i <= n; i++) {
				if (i == n) things += "and ";
				things += options[i-1] + ", ";
			}
			return [utils.random(goodquestion), " Some of my favorite " + entity + "s" + " are " + things];
		}
		return [utils.random(goodquestion), "My favorite " + utils.after(input, "favorite ") + " is " + profile[entity][0]];
	}

	return "Raindrops on roses and whiskers on kittens. These are a few of my favorite things.";
}

exports.query = query;