var NIGEL = new SpeechSynthesisUtterance();
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");

var speak = function(phrase) {
	var voices = speechSynthesis.getVoices();
	var nigel = voices[1]; var nigelette = voices[2];
	NIGEL.voice = nigel;
	NIGEL.text = phrase;
	NIGEL.rate = 2.0;
	NIGEL.pitch = 1.5;
	NIGEL.onend = function() {
	 	console.log("Nigel finished speaking... ", phrase);
	}
	if(phrase.length > 1 && phrase.length < 250) {
         speechSynthesis.speak(NIGEL);
	}
}

var baymaxSpeak = function(phrase) {
	phrase = phrase.replace(' ', '+');
	speech_url = 'http://tts-api.com/tts.mp3?q='+phrase;
	audio_elem = '<audio src="' + speech_url + '" autoplay></audio>'
	$('#audio').html(audio_elem);
	console.log("Baymax speaking... ", phrase);
}

var happyBirthday = function(person) {
	if (person.length > 1) {
		speak("Happy Birthday, " + person + "!");
	}
}