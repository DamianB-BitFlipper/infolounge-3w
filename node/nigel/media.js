var utils = require("../nigel/utils");
var Firebase = require('firebase');
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");

var affirm = ["Very well. ", "Sure thing. ", "Of course. ", "My pleasure. ", "All right. "];
var enjoy  = ["", "", "Enjoy.", "Hope you enjoy it."];
var another = ["Let me know if you want another song."]
var rand = ["something else", "another", "^music$", "song$"];
var titles = ["Beethoven's Fifth Symphony", 
			  "selections from Sound of Music",
			  "Human by Christina Perri",
			  "One Day More from Les Miserob",
			  "Bohemian Rhapsody", 
			  "Somewhere Over the Rainbow", 
			  "Oh the Thinks you Can Think from Seussical",
			  "Phantom of the Opera",
			  "Let It Go from Frozen",
			  "Don't Stop Believin'"];

function query(input, s_input, tokens, res) {
	var response = ""; var link = "";
	var random = false;
	var request = s_input.replace("{play}", "").trim();
	for (var i in rand) {
		if (request.match(rand[i]) !== null) {
			request = utils.random(titles);
			random = true;
		}
	}

	q = request + " lyrics"; 

	if (random) {
		response = utils.random(affirm) + "I'll play " + request + ". " + utils.random(another);
	} else {
		response = utils.random(affirm) + "Playing " + request + ". " + utils.random(enjoy);
	}

	var o = {req: input, std: s_input, res: response, cmd : "", media: link};
	nigelRef.update(o);
	res.json(o);
}

exports.query = query;