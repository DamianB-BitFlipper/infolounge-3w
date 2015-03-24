var speak = function(phrase) {
	if(phrase.length > 1 && phrase.length < 200) {
		$.ajax({url: "http://localhost:8001/demand/" + phrase,
			success: function(data){return;}
            });
	}
}

var baymaxSpeak = function(phrase) {
	phrase = phrase.replace(' ', '+');
	speech_url = 'http://tts-api.com/tts.mp3?q='+phrase;
	audio_elem = '<audio src="' + speech_url + '" autoplay></audio>'
	$('#audio').html(audio_elem);
	console.log("Baymax speaking...", phrase);
}

var happyBirthday = function(person) {
	if (person.length > 1){
		speak("Happy Birthday, " + person);
	}
}

var dateToSpeech = function(text) {
	for (abrev in monthAbrevs) {
		text = text.replace(monthAbrevs[abrev][0], monthAbrevs[abrev][1]);
	}
	return 	text;
}

var monthAbrevs = [
	  ['Jan.', 'January'],
		['Feb.', 'February'],
		['Mar.', 'March'],
		['Apr.', 'April'],
		['Jun.', 'June'],
		['Jul.', 'July'],
		['Aug.', 'August'],
		['Sep.', 'September'],
		['Oct.', 'October'],
		['Nov.', 'November'],
		['Dec.', 'December']
	]
