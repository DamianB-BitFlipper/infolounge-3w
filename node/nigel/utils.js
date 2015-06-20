var natural = require('natural');

function constructResponse(sentences) {
    if (typeof sentences === "undefined") return "";
    if (typeof sentences === "string") {
        sentences = sentences.replace(/([.?!])\s*(?=[A-Z\d\'])/g, "$1|").split("|")
    }
    if (sentences.length == 1) {
        return sentences[0];
    }
    if (sentences.length == 2) {
        return sentences;
    } else {
        return [ sentences[0], constructResponse(sentences.slice(1)) ];
    }
}

function random(array) {
    return (typeof array === "undefined") ? "" : array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function contains(array, search) {
    var search = search.split(" ");
    for (var i in array) {
        for (var j in search) {
            if (similar(search[j], array[i], 0.90)) {
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

    var pr = new Array();
    pr.push([ /(\+)/g , " plus " ]);
    pr.push([ /(\-)/g , " minus " ]);
    pr.push([ /(\*)/g , " times " ]);
    pr.push([ /(\\|\/)/g , " over " ]);
    pr.push([ /(\^3)/g , "cubed " ]);
    pr.push([ /(\^2)/g , " squared " ]);
    pr.push([ /(\^)/g , " to the " ]);
    pr.push([ /(sqrt\()/g , " square root of " ]);

    for (var i in pr) {
        s = s.replace(pr[i][0], pr[i][1]);
    }
    return s.trim();

}

function digitize(s) {
    text = [
            /zero/g, 
            /one|won/g,
            /two/g, 
            /three/g, 
            /fo(u)?r/g, 
            /five/g, 
            /s(i|e)x/g, 
            /seven/g, 
            /eight|ate/g, 
            /nine|nothing/g,  
            /ten/g
           ];
    for (i = 0; i <= 10; i++) {
        s = s.replace(text[i], i + " ");
    }
    return s.trim();
}

function standardizeLocation(s) {
    var pr = new Array();
    pr.push([ /red line/ , "Red Line at Kendall Station" ]);
    pr.push([ /(the )?symphony( hall)?/ , "Symphony Hall" ]);
    pr.push([ /(the )?movies/ , "Regal Cinemas at Fenway" ]);
    pr.push([ /(^| )mit($| )/ , "M.I.T." ]);
    pr.push([ /(^| )next( house)?($| )/ , "Next House" ]);

    for (var i in pr) {
        s = s.replace(pr[i][0], pr[i][1]);
    }
    return s.trim();
}

function standardize(s) {
    // pr.push(/regex pattern/
    // pr.push({string replacement}

    var pr = new Array();
    pr.push([ /(^| )(be|are|is|am|was)($| )/ , " {be} " ]);
    pr.push([ /(nigel(s)?|b(a|e)y( )?max(s)?|yourself|your|youre|you)($| )/ , "{baymax} " ]);
    pr.push([ /(^| )(doing|does|do)($| )/ , " {do} " ]);
    pr.push([ /(^| )(hello|hi|greetings|hola|bonjour|howdy|what {be} up|whats up)($| )/, " {greeting} " ]);
    pr.push([ /(^| )(okay|very good|good|great|fine|excellent|bad|well)($| )/, " {adj} " ]);
    pr.push([ /(thanks|thank you)/ , "{thank}" ]);
    pr.push([ /(^| )(i|my|we)($| )/ , " {you} " ]);
    pr.push([ /(^| )(im|i am) / , "{you} {be} " ]);
    pr.push([ /(sure|yes|okay)($| )/, "{affirmative} " ]);
    pr.push([ /(no$|nope)($| )/ , "{negative} "]);

    pr.push([ /((send )?(a(n)? )?(e(\-)?mail|message|spam)( to)?|notify) /, " {notify} " ]);
    pr.push([ /(^| )(tell|read|give)( (we|me|us))?( some| a)? / , " {tell} " ]); 
    pr.push([ /(^| )(play|sing)( (we|me|us))?( some| a)? / , " {play} " ]);
    pr.push([ /(^| )rat(e|(ing)?(s))?( for)? / , " {rate} "]);
    pr.push([ /shut[a-z\s]*up|be quiet|^(stop|stock)/ , " {stop}" ]);
    pr.push([ /(^| )(change|se(t|x)|adjust|modify) / , " {set} " ]);
    pr.push([ /(^| )(show|display)($| )/ , " {show} " ]);
    pr.push([ /(^| )(suggest(ion)?|recommend(ation)?)( (we|me|us))?( some| a)?( for)? / , " {recommend} " ]);
    pr.push([ /([\w]+) ({do} {baymax} )?(suggest(ion)?|recommend(ation)?)/ , "{recommend} $1" ]);
    pr.push([ /.* ([\w]+) ({you} should |should {you} )/ , "{recommend} $1 " ]);

    pr.push([ /(whats )/ , "what {be} " ]);
    pr.push([ /(where(s| the hell {be})|locate|find|{tell} where) / , "where {be} " ]);
    pr.push([ /(hows )/, "how {be} " ]);
    pr.push([ /(whose|whos|about|dig up dirt( on)?) / , "who {be} " ]); 
    pr.push([ /^test(ing)?/, "{testing}" ]);
    pr.push([ /(love|want|like|desire|long for) /, "{love} " ]);

    pr.push([ /(^| )(dinner|brunch|breakfast|supper|lunch|menu|dining)($| )/, " menu " ]);
    pr.push([ /(^| )(public|bus(es)?|shuttle[a-z]*|tech|campus|transport[a-z]*)($| )/, " tech " ]);
    pr.push([ /(^| )(lounge)($| )/, " news " ]);
    pr.push([ /(^| )(twitter|tweets)($| )/, " tweet " ]);
    pr.push([ /(^| )(video|lyric(s)?)($| )/, " video " ]);

    pr.push([ /(humor[a-z]*|sass[a-z]*|intelligence) (parameter )?(to)?/ , "{parameter}" ]);
    pr.push([ /((next )?(3|three) west|((6|safety( )?)(3rd|third)))($| )/ , "{safetythird} " ]);
    pr.push([ / (born|(date of )?birth( )?(day|date)?)($| )/, "{birthday} " ]);
    pr.push([ / (from$|home( )?(town)?)/, " {from} " ]);
    pr.push([ /(^| )(what )?movie(s)?( {be} )?((currently )?play(ing)? |out )?(today|(right )?now)?/, " {movies current}" ]);
    pr.push([ /(^| )(directions|how ({do}|to) ({you} |we |{baymax} )?(get|go) )(to )?/, " {directions}" ]);
    pr.push([ /shut( )?down/, "{shutdown}" ]);
    pr.push([ /start( )?up/ , "{startup}" ]);
    pr.push([ /(suck|lose(r)?|dumb|derp|stink|mom|mother|ugly|fat|stupid|retarded|lame|boring|annoying|dead|tool[a-z]*|fool|rape|idiot|fuck)( |$)/, "{insult} "]);

    pr.push([ /mm (0)?/, ".00" ]);
    pr.push([ / double (o|0)(h)? / , ".00"]);
    pr.push([ / triple (o|0)(h)? / , ".000"]);

    for (var i in pr) {
        s = s.replace(pr[i][0], pr[i][1]);
    }
    return s.trim();
}

exports.random = random;
exports.shuffle = shuffle;
exports.similar = similar;
exports.after = after;
exports.between = between;
exports.contains = contains;
exports.standardize = standardize;
exports.standardizeLocation = standardizeLocation;
exports.math = stringifyMath;
exports.digitize = digitize;
exports.construct = constructResponse;