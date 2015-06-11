var natural = require('natural');

function random(array) {
	return array[Math.floor(Math.random()*array.length)];
}

function contains(array, search) {
	var search = search.split(" ");
	for (var i in array) {
		for (var j in search) {
			if ( search[j].indexOf(array[i]) == 0 ) {
				return true;
			}
		}
	}
	return false;
}

function after(S, s) {
	if (S.indexOf(s) > -1) {
		return S.substring(S.indexOf(s) + s.length);
	}
	return S;
}

function between(S, start, end) {
	temp = S.substring(S.indexOf(start) + start.length);
	return temp.substring(0, temp.indexOf(end));
}

function similar(s1, s2, threshold) {
	return natural.JaroWinklerDistance(s1, s2) >= threshold;
}

function stringifyMath(s) {

	var patterns = new Array();
	patterns[0] = /(\+)/
	patterns[1] = /(\-)/
	patterns[2] = /(\*)/
	patterns[3] = /(\\)/
	patterns[4] = /(\^3)/
	patterns[5] = /(\^2)/
	patterns[6] = /(\^)/
	patterns[7] = /(sqrt)/

	var replacements = new Array();
	replacements[0] = " plus ";
	replacements[1] = " minus "
	replacements[2] = " times "
	replacements[3] = " over "
	replacements[4] = " cubed"
	replacements[5] = " squared";
	replacements[6] = " to the "
	replacements[7] = " square root of "

	for (var i in patterns) {
		s = s.replace(patterns[i], replacements[i]);
	}
	return s.trim();

}

function standardize(s) {
	
	var patterns = new Array();
	patterns[0] = / (be|are|is|am)($| )/;
	patterns[1] = /(nigels|nigel|youre|your|you)/;
	patterns[2] = / (suck|lose|dumb|derp|derpy|stink)/;
	patterns[3] = /(mom|mother|ugly|fat|stupid|dumb|retarded|lame|boring|annoying|dead|a loser|tool|toolshed|fool|rape|derp|derpy|an idiot)/;
	patterns[4] = / (doing|does|do)($| )/;
	patterns[5] = / (okay|very good|good|great|fine|excellent|bad|well)/;
	patterns[6] = /(thanks|thank you)/;
	patterns[7] = /(^| )(im|i am) /;
	patterns[8] = /(sure|yes|okay)($| )/;
	patterns[9] = /(no$|nope)/;
	patterns[10] = /(email|notify|send email to|message|send message to) /;
	patterns[11] = /(hello|hi($| )|greetings|hola|bonjour|howdy|what {be} up|whats up)/
	patterns[12] = /((^|\s)i|my)($|\s)/
	patterns[13] = /(tell me a|tell a|tell) /
	patterns[14] = /(play some|play a|play|^sing) /
	patterns[15] = /shut[a-z\s]*up|be quiet|^stop/
	patterns[16] = /^test(ing)?/
	patterns[17] = /(love|want|like|desire|long for) /
	patterns[18] = /(^| )(dinner|brunch|breakfast|supper|lunch)($| )/
	patterns[19] = /(^| )(public|buses|bus|shuttles|tech)($| )/
	patterns[20] = /(^| )(lounge news)($| )/
	patterns[21] = /(^| )(change|set|adjust|modify) /
	patterns[22] = /(humor|humorous|sassiness|sassy|sass|intelligence) (parameter )?(to)?/
	patterns[23] = /(whats )/

	var replacements = new Array();
	replacements[0] = " {be} ";
	replacements[1] = "{nigel}";
	replacements[2] = " {insult v}";
	replacements[3] = "{insult adj}";
	replacements[4] = " {do} ";
	replacements[5] = " {adj}";
	replacements[6] = "{thank}";
	replacements[7] = " {you} {be} ";
	replacements[8] = "{affirmative}";
	replacements[9] = "{negative}";
	replacements[10] = "{notify} ";
	replacements[11] = "{greeting}";
	replacements[12] = " {you} ";
	replacements[13] = "{tell} ";
	replacements[14] = "{play} ";
	replacements[15] = "{shutup}";
	replacements[16] = "{testing}";
	replacements[17] = "{love} ";
	replacements[18] = " dining ";
	replacements[19] = " shuttle ";
	replacements[20] = " news ";
	replacements[21] = " {set} ";
	replacements[22] = "{parameter}";
	replacements[23] = "what {be} "

	for (var i in patterns) {
		s = s.replace(patterns[i], replacements[i]);
	}
	return s.trim();
}

exports.similar = similar;
exports.after = after;
exports.between = between;
exports.contains = contains;
exports.standardize = standardize;
exports.random = random;
exports.math = stringifyMath;