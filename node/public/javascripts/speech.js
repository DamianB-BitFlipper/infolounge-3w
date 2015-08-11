var baymaxRef = new Firebase("https://safetybaymax.firebaseio.com/global/speech");
var baymax = /baymax/.test(location.href);
var https = /^https/.test(location.href);

/* Baymax states */
var firstLoad = true;
var isSpeaking = false;
var isSleeping = false;
var isMobile = false;
var isPlayingMusic = false;

/* Baymax speech variables */
var accent = 0;
var pitch = 0.5;
var longPause = 2500;
var previousResponse = {};

var speak = function (phrase, followup, command, params) {
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
        return;
    }
    BAYMAX.voice = speechSynthesis.getVoices()[params.accent || 0];
    BAYMAX.text = first;
    BAYMAX.volume = 0;
    BAYMAX.pitch = params.pitch || 0.50;
    BAYMAX.rate = params.rate || 1.0;
    BAYMAX.onstart = function () {
        wave.start(); $("#wave").fadeIn(); 
        isSpeaking = true;
    }
    if (next || followup) {
        BAYMAX.onend = function () {
            $("#wave").fadeOut(1000, function(){wave.stop();});
            setTimeout(function () {
                speak(next, followup, command, params);
            }, pauseDuration);
        }
    } else {
        BAYMAX.onend = function () {
            $("#wave").fadeOut(1000, function(){wave.stop();});
            isSpeaking = false;
            if (https) {
                try {
                    recognition.start();
                } catch (e) {}
            }
        }
    }
    speechSynthesis.speak(BAYMAX);
}

baymaxRef.on("value", function (ss) {
    var data = ss.val();
    if (firstLoad && https) {
        try {
            setUpRecognition();
        } catch (e) {}
    }
    if (!firstLoad) {
        previousResponse = data;
        processResponse(data);
        lastAction = new Date().getTime();
    }
    firstLoad = false;
}, function (error) {
    console.log("Firebase error: " + error);
});

var processResponse = function (result) {
    if (result.media) {
        if (result.media.type == "video") {
            var url = (https ? 'https' : 'http') +
                "://www.youtube.com/embed/" + result.media.link +
                "?autoplay=1&start=3&controls=0&iv_load_policy=3&modestbranding=1";
            $("#player").attr("src", url);
            wave.start();
            $("#wave").fadeIn(); 
        }
        if (result.media.type == "map") {
            var url = result.media.link.replace(/^http(s)?/, (https ?
                'https' : 'http'));
            $("#googlemap").attr("src", result.media.link);
        }
        if (result.media.type == "image") {
            $('#content').slideUp(1000, function() {
                $("#baymax").fadeIn(1000, function() {
                    showImage(result.media.url);
                });
            });
        }
    }
    if (result.command) {
        try {
            processCommand(result.command);
        } catch (e) {}
    } else if (result.response.speech) {
        showBaymax();
        $("#siri").fadeOut(500);
        $("#jarvis").fadeOut(500, function(){
            $("#baymax").css("background-color", "white");
            $("#baymax-eyes").fadeIn();
            wave.color = "192,192,192";
        });
    }
    if (result.response.speech) {
        wave.start(); $("#wave").fadeIn();
        sentences = result.response.text.match(/(\.|\?|\!)($|\s[A-Z])/g) || "";
        speechDuration = result.response.text.length/17*1000 + 500*sentences.length;
        setTimeout(function(){
            $("#wave").fadeOut(1000, function(){wave.stop();}); 
            if (result.response.followup) {
                setTimeout(function(){
                    wave.start(); $("#wave").fadeIn();
                    setTimeout(function(){
                        $("#wave").fadeOut(1000, function(){wave.stop();}); 
                    }, 4000)
                }, longPause);
            }
        }, speechDuration);
    }
}

$(document).ready(function(){
    setInterval(function() {
        if (new Date().getTime() - lastAction > 60000 && $("#baymax").css("display") != "none") {
            $("#baymax").fadeOut(1000, function() {
                $('#content').slideDown();
                $("#baymax-image").hide();
            });
        }
    }, 60000);
});

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '375',
        videoId: ""
    });
}