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
    pr[0] = [ /(\+)/g , " plus " ];
    pr[1] = [ /(\-)/g , " minus " ];
    pr[2] = [ /(\*)/g , " times " ];
    pr[3] = [ /(\\|\/)/g , " over " ];
    pr[4] = [ /(\^3)/g , "cubed " ];
    pr[5] = [ /(\^2)/g , " squared " ];
    pr[6] = [ /(\^)/g , " to the " ];
    pr[7] = [ /(sqrt\()/g , " square root of " ];

    for (var i in pr) {
        s = s.replace(pr[i][0], pr[i][1]);
    }
    return s.trim();

}

function digitize(s) {
    text = [
            /zero/g, 
            /one/g,
            /two/g, 
            /three/g, 
            /four/g, 
            /five/g, 
            /six/g, 
            /seven/g, 
            /eight/g, 
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
    pr[0] = [ /red line/ , "Red Line at Kendall Station" ];
    pr[1] = [ /(the )?symphony( hall)?/ , "Symphony Hall" ];
    pr[2] = [ /(the )?movies/ , "Regal Cinemas at Fenway" ];
    pr[3] = [ /(^| )mit($| )/ , "M.I.T." ];
    pr[4] = [ /(^| )next( house)?($| )/ , "Next House" ]

    for (var i in pr) {
        s = s.replace(pr[i][0], pr[i][1]);
    }
    return s.trim();
}

function standardize(s) {
    // pr[0] = /regex pattern/
    // pr[1] = {string replacement}

    var pr = new Array();
    pr[0]  = [ /(^| )(be|are|is|am|was)($| )/ , " {be} " ];
    pr[1]  = [ /(nigel(s)?|b(a|e)y( )?max(s)?|yourself|your|youre|you)($| )/ , "{baymax} " ];
    pr[2]  = [ /(^| )(doing|does|do)($| )/ , " {do} " ];
    pr[3]  = [ /(^| )(hello|hi|greetings|hola|bonjour|howdy|what {be} up|whats up)($| )/, " {greeting} " ];
    pr[4]  = [ /(^| )(okay|very good|good|great|fine|excellent|bad|well)($| )/, " {adj} " ];
    pr[5]  = [ /(thanks|thank you)/ , "{thank}" ];
    pr[6]  = [ /(^| )(i|my|we)($| )/ , " {you} " ];
    pr[7]  = [ /(^| )(im|i am) / , "{you} {be}" ];
    pr[8]  = [ /(sure|yes|okay)($| )/, "{affirmative} " ];
    pr[9]  = [ /(no$|nope)($| )/ , "{negative} "];
    pr[10] = [ /((send )?(a(n)? )?(e(\-)?mail|message|spam)( to)?|notify) /, " {notify} " ];
    pr[11] = [ /(^| )(tell|read)( (we|me|us))?( some| a)? / , " {tell} " ]; 
    pr[12] = [ /(^| )(play|sing)( (we|me|us))?( some| a)? / , " {play} " ];
    pr[13] = [ /shut[a-z\s]*up|be quiet|^(stop|stock)/ , " {stop}" ];
    pr[14] = [ /(^| )(change|se(t|x)|adjust|modify) / , " {set} " ];
    pr[15] = [ /(^| )(show|display)($| )/ , " {show} " ];
    pr[16] = [ /(whats )/ , "what {be} " ];
    pr[17] = [ /(where(s| the hell {be})|locate|find|{tell} where) / , "where {be} " ];
    pr[18] = [ /(hows )/, "how {be} " ];
    pr[19] = [ /(whose|whos|about) / , "who {be} " ]; 
    pr[20] = [ /^test(ing)?/, "{testing}" ];
    pr[21] = [ /(love|want|like|desire|long for) /, "{love} " ];

    pr[22] = [ /(^| )(dinner|brunch|breakfast|supper|lunch|menu|dining)($| )/, " menu " ];
    pr[23] = [ /(^| )(public|bus(es)?|shuttle[a-z]*|tech|campus|transport[a-z]*)($| )/, " tech " ];
    pr[24] = [ /(^| )(lounge)($| )/, " news " ];
    pr[25] = [ /(^| )(twitter|tweets)($| )/, " tweet " ];
    pr[26] = [ /(^| )(video|lyric(s)?)($| )/, " video " ];

    pr[27] = [ /(humor[a-z]*|sass[a-z]*|intelligence) (parameter )?(to)?/ , "{parameter}" ];
    pr[28] = [ /((next )?(3|three) west|((6|safety( )?)(3rd|third)))($| )/ , "{safetythird} " ];
    pr[29] = [ / (born|(date of )?birth( )?(day|date)?)($| )/, "{birthday} " ];
    pr[30] = [ / (from$|home( )?(town)?)/, " {from} " ];
    pr[31] = [ /(^| )(directions|how ({do}|to) ({you} |we |{baymax} )?(get|go) )(to )?/, " {directions}" ];
    pr[32] = [ /shut( )?down/, "{shutdown}" ];
    pr[33] = [ /start( )?up/ , "{startup}" ];
    pr[34] = [ /(suck|lose(r)?|dumb|derp|stink|mom|mother|ugly|fat|stupid|retarded|lame|boring|annoying|dead|tool[a-z]*|fool|rape|idiot|fuck)( |$)/, "{insult} "];

    pr[35] = [ /mm (0)?/, ".00" ];
    pr[36] = [ / double (o|0)(h)? / , ".00"];
    pr[37] = [ / triple (o|0)(h)? / , ".000"];

    for (var i in pr) {
        s = s.replace(pr[i][0], pr[i][1]);
    }
    return s.trim();
}

exports.random = random;
exports.similar = similar;
exports.after = after;
exports.between = between;
exports.contains = contains;
exports.standardize = standardize;
exports.standardizeLocation = standardizeLocation;
exports.math = stringifyMath;
exports.digitize = digitize;
exports.construct = constructResponse;