var baymaxRef = new Baymax("aHR0cHM6Ly9zYWZldHliYXltYXguZmlyZWJhc2Vpby5jb20vZ2xvYmFsL3NwZWVjaA==");
var baymax = /baymax/.test(location.href);
var https = /^https/.test(location.href);

/* Baymax states */
var firstLoad = true;
var isSpeaking = false;
var isSleeping = false;
var isMobile = false;
var isPlayingMusic = false;

/* Baymax sound effects */
const ACTIVATE = new Audio('sounds/activate.mp3');
const DEACTIVATE = new Audio('sounds/deactivate.mp3');
const SLEEP = new Audio("sounds/sleep.mp3");
const SCAN = new Audio("sounds/scan.mp3");
const WINDOW = new Audio('sounds/window.ogg');
const BABY = new Audio('sounds/hairybaby.ogg');
const BALALA = new Audio('sounds/balala.ogg');
const GOODBYE = new Audio('sounds/goodbye.ogg');
const FEEL_BETTER = new Audio('sounds/feelbetter.mp3');

const ENTITY = {
    baymax: "baymax",
    siri: "siri",
    jarvis: "jarvis"
}
const SPEAKING = {
    baymax: new Audio("sounds/speaking_baymax.ogg"),
    jarvis: new Audio("sounds/speaking_jarvis.ogg")
}
const BEEP = {
    baymax: new Audio("sounds/beep_baymax.ogg"),
    jarvis: new Audio("sounds/beep_jarvis.ogg"),
    siri: new Audio("sounds/beep_siri.ogg")
}

/* Baymax speech variables */
var accent = 0;
var pitch = 0.5;
var longPause = 2500;
var previousResponse = {};

var speak = function (phrase, followup, command, params) {
    var UTTERANCE = new SpeechSynthesisUtterance();
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
        return;
    }
    UTTERANCE.voice = speechSynthesis.getVoices()[params.accent || 0];
    UTTERANCE.text = first;
    UTTERANCE.volume = 10;
    UTTERANCE.pitch = params.pitch || 0.5;
    UTTERANCE.rate = params.rate || 1.0;
    var entity = params.entity || ENTITY.baymax;
    if (first.length == 1 || isMobile) {
        UTTERANCE.volume = 0;
    }
    if (entity == ENTITY.baymax) {
        if (/jumped out a window/.test(first)) {
            UTTERANCE.volume = 0;
            beep = false;
            WINDOW.play();
        }
        if (/hairy baby/i.test(first)) {
            UTTERANCE.volume = 0;
            beep = false;
            BABY.play();
        }
        if (/balala/i.test(first)) {
            UTTERANCE.volume = 0;
            beep = false;
            BALALA.play();
            return;
        }
        if (/feel.*?better/.test(first)) {
            UTTERANCE.volume = 0;
            FEEL_BETTER.play();
            return;
        }
        if (/deactivate/.test(first)) {
            UTTERANCE.volume = 0;
            DEACTIVATE.play();
            SPEAKING[entity].play();
        }
        if (/scan complete/i.test(first)) {
            UTTERANCE.volume = 0;
            SCAN.play();
        }
        if (/glad i can help/i.test(first)) {
            UTTERANCE.volume = 0;
            GOODBYE.play();
            SPEAKING[entity].play();
        }
        if (/startup/.test(command)) {
            ACTIVATE.play();
        }
        if (/shut.*?down/.test(first)) {
            isSleeping = true;
        }
    }
    UTTERANCE.onstart = function () {
        wave.start(); $("#wave").fadeIn();
        isSpeaking = true;
        recognition.stop();
        if (UTTERANCE.volume > 0 && Math.random() > 0.5) {
            try {
                SPEAKING[entity].play();
            } catch(e) {}
        }
    }
    if (next || followup) {
        UTTERANCE.onend = function () {
            setTimeout(function () {
                speak(next, followup, command, params);
            }, pauseDuration);
            if (beep) {
                BEEP[entity].play();
            }
            $("#wave").fadeOut(1000, function(){wave.stop();}); 
        }
    } else {
        UTTERANCE.onend = function () {
            if (baymax && beep) {
                BEEP[entity].play();
            }
            if (isSleeping) {
                SLEEP.play();
            }
            try {
                SPEAKING[entity].pause();
            } catch(e) {}
            isSpeaking = false;
            $("#wave").fadeOut(1000, function(){wave.stop();}); 
            if (https) {
                try {
                    recognition.start();
                } catch (e) {}
            }
        }
    }
    speechSynthesis.speak(UTTERANCE);
}

baymaxRef.on("value", function (ss) {
    var data = ss.val();
    if (firstLoad && https) {
        try {
            setUpRecognition();
        } catch (e) {}
    }
    previousResponse = data;
    if (!firstLoad && !isMobile) {
        processResponse(data);
    } else {
        wave.start(); 
        $("#wave").fadeIn();
        setTimeout(function() {
            $("#wave").fadeOut(750, function(){
                 wave.stop();
            }); 
        }, 3000);
    }
    firstLoad = false;
}, function (error) {
    console.log("Firebase error: " + error);
});

var processResponse = function (result) {
    var speechParams = {};
    if (result.command && result.command.voice) {
        result.command.voice.accent = result.command.voice.accent || 0;
        speechParams.accent = (result.command.voice == "british") ? 2 : (result.command.voice ==
            "spanish") ? 3 : (result.command.voice == "french") ? 4 : result.command.voice.accent;
        speechParams.pitch = result.command.voice.pitch || 0.5;
        speechParams.rate = result.command.voice.rate || 1.0;
        speechParams.entity = result.command.voice.entity || "baymax";
    }
    if (/startup/.test(result.command)) {
        isSleeping = false;
    }
    if (result.response.speech && https && !isSleeping) {
        speak(result.response.speech, result.response.followup, result.command, speechParams);
    } else if (/startup/.test(result.command)) {
         location.reload(true);
    } 
    if (result.media) {
        if (result.media.type == "video") {
            isPlayingMusic = true;
            wave.start(); $("#wave").fadeIn(); 
            clearTimeouts();
        }
    }
    if (result.command == "stop") {
        isPlayingMusic = false;
        clearTimeouts();
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '375',
        videoId: ""
    });
}