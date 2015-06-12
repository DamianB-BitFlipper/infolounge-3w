var BAYMAX = new SpeechSynthesisUtterance();
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");

var speak = function(phrase) {
	var voices = speechSynthesis.getVoices();
	var baymax = voices[1];
	BAYMAX.voice = baymax;
	BAYMAX.text = phrase;
	BAYMAX.pitch = 1.40;
	BAYMAX.rate = 1.0;
	BAYMAX.onend = function() {
	 	console.log("Baymax finished speaking... ", phrase);
	}
	if (phrase.length > 1 && phrase.length < 250) {
         speechSynthesis.speak(BAYMAX);
	}
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
    if (data.sms) {
    	var res = data.res;
    	speak(res);
	}
}, function (error) {
    console.log("Firebase error: ", error);
});

var happyBirthday = function(person) {
	if (person.length > 1) {
		speak("Happy Birthday, " + person + "!");
	}
}