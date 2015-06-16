var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");
var firstLoad = true;
var isSpeaking = false;
var startBeep = new Audio('sounds/startBeep.mp3');
var endBeep = new Audio('sounds/endBeep.mp3');
endBeep.volume = 0.75;
startBeep.volume = 0.75;
var beeps = [startBeep, endBeep];
var longPause = 2000;
var previousResponse = {};

var speak = function(phrase, followup, command) {
    var BAYMAX = new SpeechSynthesisUtterance();
    var first;
    var next;
    var pauseDuration = 0;
    var beep = false;
    if (typeof phrase == "object") {
        first = phrase[0] || "";
        next = phrase[1] || "";
    } else {
        first = phrase;
        next = followup;
        followup = "";
        beep = true;
        pauseDuration = longPause;
    }
    if (!first || first.length > 250) {
        processCommand(command);
        return;
    }
    BAYMAX.voice = speechSynthesis.getVoices()[1];;
    BAYMAX.text = first;
    BAYMAX.volume = 10;
    BAYMAX.pitch = (typeof first == "string" && first.indexOf("Hairy baby") > -1) ? 1.80 : 1.40;
    BAYMAX.rate = (typeof first == "string" && first.indexOf("Hairy baby") > -1) ? 1.20 : 0.95;
    BAYMAX.onstart = function() {
        isSpeaking = true;
        recognition.stop();
    }
    if (next || followup) {
        BAYMAX.onend = function() {
            setTimeout(function() {
                speak(next, followup, command)
            }, pauseDuration);
            if (beep) {
                rand(beeps).play();
            }
        }
    } else {
        BAYMAX.onend = function() {
            random(beeps).play();
            isSpeaking = false;
            try {recognition.start()} catch(e) {}
            processCommand(command);
        }
    }
    speechSynthesis.speak(BAYMAX);
}

nigelRef.on("value", function(ss) {
    var data = ss.val();
    if (firstLoad) {setUpRecognition()}
    if (data.sms && !firstLoad) {
        previousResponse = data;
        processResponse(data);
    }
    firstLoad = false;
}, function(error) {
    console.log("Firebase error: " + error);
});

var processResponse = function(result) {
    if (result.res) {
        speak(result.res, result.followup, result.cmd);
    }
    if (result.media) {
        var url = "http://www.youtube.com/embed/" + result.media + "?autoplay=1&start=3&controls=0&iv_load_policy=3&modestbranding=1";
        $("#player").attr("src", url);
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '375',
        videoId: ""
    });
}