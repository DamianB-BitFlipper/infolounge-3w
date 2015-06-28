var transcript = "";
var recognition = new webkitSpeechRecognition();
var startup = /.*?ma(x|cs)/
setUpRecognition = function() {
	recognition.onstart = function(event) {
		console.log("recognition started");
	}
	recognition.onresult = function(event) {
		transcript = event.results[event.results.length-1][0].transcript
		isSleeping = isSleeping ? !startup.test(transcript) : false 
		if (transcript && !isSleeping) {
			startBeep.play();
			console.log("Sending to server: " + transcript);
			if ( /(localhost|runpengliu)/.test(location.href) ) {
				processSpeech(transcript.trim());
			} else {
				sendRequest(transcript.trim())
			}
		}
	}
	recognition.onsoundend = function(event) { 
		console.log("sound has ended");
	}
	recognition.onend = function(event) {
		setTimeout(function() {
			if (https && !isSpeaking) {
				try {event.target.start()} catch(e) {}
			}
		}, 1000);
	}
	recognition.onerror = function(event) {
		if (https) {
			try {event.target.start()} catch(e) {}
		}
	}
	recognition.start();
}
