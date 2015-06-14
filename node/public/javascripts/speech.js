
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");
var firstLoad = true;

var speak = function(phrase, followup, command) {
	var BAYMAX = new SpeechSynthesisUtterance();
	var p; var f;
	if (typeof phrase == "object") {
		f = phrase[1] || "";
		p = phrase[0] || "";
	} else {
		p = phrase;
		f = followup;
		followup = "";
	}
	if (p.trim().length < 1 || p.length > 250) {
		processCommand(command);
		return;
	}
	var voices = speechSynthesis.getVoices();
	BAYMAX.voice = voices[1];
	BAYMAX.text = p;
	BAYMAX.pitch = 1.40;
	BAYMAX.rate = 1.0;
	if (f || followup) {
		BAYMAX.onend = function() {
	 		console.log("Baymax finished speaking... ", p);
	 		setTimeout(speak(f, followup, command), 2500);
		}
	} else {
		BAYMAX.onend = function() {
	 		console.log("Baymax finished speaking... ", p);
	 		processCommand(command);
		}
	}
    speechSynthesis.speak(BAYMAX);
}

var baymaxSpeak = function(phrase) {
	phrase = phrase.replace(' ', '+');
	speech_url = 'http://tts-api.com/tts.mp3?q='+phrase;
	audio_elem = '<audio src="' + speech_url + '" autoplay></audio>'
	$('#audio').html(audio_elem);
	console.log("Baymax speaking... ", phrase);
};

nigelRef.on("value", function (ss) {
    var data = ss.val();
    if (data.sms && !firstLoad) {
    	processResponse(data);
	}
	firstLoad = false;
}, function (error) {
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

var processCommand = function(command) {
	if (!command) {
		return;
	}
	console.log("Executing command... " + command);
	if (command == "stop") {
		$("#player").attr("src", "");
	}
	if ($("#player").attr("src") == "") {
		$("#videopanel").slideUp();
		$("#weatherpanel").find('div').slideDown();
		$("#tweetpanel").find('div').slideDown();
	}
	if (command.indexOf("hide") > -1) {
		$('#' + command.split(" ")[1] + "panel").find('div').slideUp();
	}
	if (command.indexOf("show") > -1) {
		$('#' + command.split(" ")[1] + "panel").find('div').slideDown();
	}
	if (command.indexOf("show video") > -1) {
		$('#videopanel').slideDown();
		$("#weatherpanel").find('div').slideUp();
		$("#tweetpanel").find('div').slideUp();
	}
	if (command.indexOf("hide video") > -1) {
		$("#weatherpanel").find('div').slideDown();
		$("#tweetpanel").find('div').slideDown();
	}
	return;
}

	function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
              height: '375',
              videoId: ""
          });
    }
