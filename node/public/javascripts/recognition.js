var transcript = "";
var recognition = new webkitSpeechRecognition();
setUpRecognition = function() {
	//recognition.continuous = false;
	//recognition.interimResults = false;
	recognition.onstart = function(event) {
		console.log("recognition started");
	}
	recognition.onresult = function(event) {
		result = event.results[event.results.length-1][0].transcript
		transcript = result;
		if (transcript) {
			startBeep.play();
			console.log("Sending to server: " + transcript);
			if (location.href.match(/(localhost|runpengliu)/)) {
				processSpeech(transcript.trim());
			} else {
				speak(random.helpful[Math.floor(Math.random()*random.helpful.length)])
			}
		}
	}
	recognition.onsoundend = function(event) { 
		console.log("sound has ended");
	}
	recognition.onend = function(event) {
		setTimeout(function() {
			if (!isSpeaking) {
				event.target.start();
			}
		}, 2000);
	}
	recognition.onerror = function(event) {
		event.target.start();
	}
	recognition.start();
}


processSpeech = function(input) {
	transcript = "";
	request = {input: input, previous: previousResponse}
	$.ajax('/demand', {
		type: "POST",
		dataType : "json",
		data: request,
		success: function(response) {
			console.log("Response from Baymax server: " + JSON.stringify(response));
		},
		error: function(info) {
			console.log("Error in processing request: " + JSON.stringify(input))
		}
	});
}
