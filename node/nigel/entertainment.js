var utils = require('../nigel/utils');
var j = "If you don't like my jokes, you can adjust my intelligence or humorous parameters.";

function query(input, s_input, tokens, stems) {
	result = new Object();
	response = ""; followup = "";
	for (i in stems) {
		var e = stems[i];
		if (entertainment[e]) {
			entry = utils.random(entertainment[e]);
			if (/poe/.test(e)) {
				response = "Okay, here's a haiku. ";
			}
			if (/joke/.test(e)) {
				response = utils.construct(entry[0]) || ""; followup = utils.construct(entry[1]) || "";
			} else {
				response = utils.construct(response + entry);
			}
			break;
		}
	}
	return {response: response, followup: followup};
}

function recommend(input, s_input, tokens, stems) {
	var randomResponses = require('../nigel/random').randomResponses;
	var response = "";
	for (i in stems) {
		var e = stems[i];
		if (recommendations[e]) {
			response = utils.random(randomResponses.recommend).replace("{entity}", e + "s");
			if (/game/.test(e)) {
				response += "a quick game of: "
			}
			entries = utils.shuffle(recommendations[e]).slice(0, Math.floor(Math.random()*3) + 1);
			response += entries.join(", ").replace(/\,\s([\w\-\s]+)$/, ", or $1") + ".";
			if (/class/.test(e)) {
				response = Math.random() < 0.3 ? ["That depends on what course you are.", "Would you like to tell Baymax about yourself?"] : response;
			}
			break;
		}
	}
	return response;
}

recommendations = new Array();
recommendations.game = [ "One-Night Ultimate Werewolf", "Super Smash Brothers", "Mario Kart", "Canadian Fish", "Resistance", "Spy fall", "Seven Wonders"];
recommendations.class = [ "2 double oh 9", "6 oh fun", "take 18 oh 2 three times", "anything that is not course 10", "anything that is not taught by Albert Meyer"];
recommendations.movi = [ "Big Hero 6", "Imitation Game", "Interstellar", "Lego Movie", "Forrest Gump", "Boyhood", "Gravity"]

entertainment = new Array();
entertainment.joke = [ 
 ["Two statisticians are out hunting when one of them sees a duck.  The first takes aim and shoots, but the bullet goes sailing past six inches too high.  The second statistician also takes aim and shoots, but this time the bullet goes sailing past six inches too low.  The two statisticians then give one another high fives and exclaim: Got Him!"] , 
 ["Do you know Hilbert?", "Then what are you doing in his space?"],
 ["What's purple and works from home?", ["A non Abelian grape!", "Because it doesn't commute."]],
 ["What is green and homeomorphic to the open unit interval?", ["The real lime. Hah. Hah. Hah.", j]],
 ["Why was the chemist booed at the comedy club?", ["His jokes were Boron? Hah. Hah. Hah.", j] ],
 ["Did you hear, did you hear, oxygen and magnesium got together!", "O.MG."],
 ["What did the nuclear physicist order for lunch?", "Fission chips!"],
 ["Why does hamburger have lower energy than steak?", "Because it's in the ground state!"],
 ["Heisenberg is out for a drive when he's stopped by a traffic cop. The officer asks him. 'Do you know how fast you were going?' Heisenberg replies. 'No, but I know where I am' "]
 ]; 

entertainment.haiku = [ 
"All day and all night. I have listened as you spoke. Please recharge Baymax.", 
"Baymax sees small door. He knows he cannot fit through. Tears flow down his eyes.",
"Haikus are easy. But sometimes they don't make sense. Refrigerator.",
"I see you driving. Round town with the girl I love. And I'm like: hai-ku."
 ];

entertainment.stori = [ "It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind: slipped quickly through the glass doors of Victory Mansions: though not quickly enough to prevent a swirl of gritty dust from entering along with him.",
                           "Happy families are all alike: every unhappy family is unhappy in its own way. Everything was in confusion in the Karenina house. The wife had discovered that the husband was carrying on an intrigue with a French girl: who had been a governess in their family. She had announced to her husband that she could not go on living in the same house with him.",
                           "Mister and Missus Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal. They were the last people you'd expect to be involved in anything strange or mysterious. Because they just didn't hold with such nonsense.",
                           "It was the best of times. It was the worst of times. It was the age of wisdom. It was the age of foolishness. It was the epoch of belief. It was the epoch of incredulity. It was the season of Light. It was the season of Darkness. It was the spring of hope, it was the winter of despair. In short, the period was so far like the present period. That some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only." ];

entertainment.poem = entertainment.haiku;
entertainment.poetri = entertainment.haiku;

exports.query = query;
exports.recommend = recommend;
