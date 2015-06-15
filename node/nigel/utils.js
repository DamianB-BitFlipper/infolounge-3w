var natural = require('natural');

function random(array) {
	return (typeof array === "undefined") ? "" : array[Math.floor(Math.random()*array.length)];
}

function contains(array, search) {
	var search = search.split(" ");
	for (var i in array) {
		for (var j in search) {
			if ( similar(search[j], array[i], 0.90) ) {
				return true;
			}
		}
	}
	return false;
}

function after(S, s) {
	return (S.indexOf(s) > -1) ? S.substring(S.indexOf(s) + s.length) : S;
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
	patterns[0] = /(\+)/g
	patterns[1] = /(\-)/g
	patterns[2] = /(\*)/g
	patterns[3] = /(\\|\/)/g
	patterns[4] = /(\^3)/g
	patterns[5] = /(\^2)/g
	patterns[6] = /(\^)/g
	patterns[7] = /(sqrt\()/g

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
	patterns[0] = /(^| )(be|are|is|am|was)($| )/;
	patterns[1] = /(nigel(s)?|b(a|e)y( )?max|yourself|your|youre|you)($| )/;
	patterns[2] = / (suck|lose|dumb|derp|derpy|stink)/;
	patterns[3] = /(mom|mother|ugly|fat|stupid|dumb|retarded|lame|boring|annoying|dead|a loser|tool|toolshed|fool|rape|derp|derpy|an idiot|fuck)( |$)/;
	patterns[4] = / (doing|does|do)($| )/;
	patterns[5] = / (okay|very good|good|great|fine|excellent|bad|well)/;
	patterns[6] = /(thanks|thank you)/;
	patterns[7] = /(^| )(im|i am) /;
	patterns[8] = /(sure|yes|okay)($| )/;
	patterns[9] = /(no$|nope)/;
	patterns[10] = /((send )?(email|message)( to)?|notify) /;
	patterns[11] = /(hello|hi($| )|greetings|hola|bonjour|howdy|what {be} up|whats up)/
	patterns[12] = /(^| )(i|my)($| )/
	patterns[13] = /(tell me a|tell a|tell( me)?) /
	patterns[14] = /(play some|play a|(^| )play|^sing) /
	patterns[15] = /shut[a-z\s]*up|be quiet|^stop/
	patterns[16] = /^test(ing)?/
	patterns[17] = /(love|want|like|desire|long for) /
	patterns[18] = /(^| )(dinner|brunch|breakfast|supper|lunch|menu|dining)($| )/
	patterns[19] = /(^| )(public|bus(es)?|shuttle[a-z]*|tech|campus|transport[a-z]*)($| )/
	patterns[20] = /(^| )(lounge)($| )/
	patterns[21] = /(^| )(twitter|tweets)($| )/
	patterns[22] = /(^| )(show|display)($| )/
	patterns[23] = /(^| )(change|set|adjust|modify) /
	patterns[24] = /(humor[a-z]*|sass[a-z]*|intelligence) (parameter )?(to)?/
	patterns[25] = /(whats )/
	patterns[26] = /(wheres )/
	patterns[27] = /(hows )/
	patterns[28] = /(whose|whos|about) /
	patterns[29] = /(safety( )?(3rd|third)) /
	patterns[30] = / (born|(date of )?birth( )?(day|date)?)($| )/
	patterns[31] = / (from$|home( )?(town)?)/

	var replacements = new Array();
	replacements[0] = " {be} ";
	replacements[1] = "{baymax} ";
	replacements[2] = " {insult v}";
	replacements[3] = "{insult adj} ";
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
	replacements[18] = " menu ";
	replacements[19] = " tech ";
	replacements[20] = " news ";
	replacements[21] = " tweet ";
	replacements[22] = " {show} "
	replacements[23] = " {set} ";
	replacements[24] = "{parameter}";
	replacements[25] = "what {be} ";
	replacements[26] = "where {be} ";
	replacements[27] = "how {be} ";
	replacements[28] = "who {be} ";
	replacements[29] = "{safetythird} ";
	replacements[30] = " {birthday} "
	replacements[31] = " {from}"

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