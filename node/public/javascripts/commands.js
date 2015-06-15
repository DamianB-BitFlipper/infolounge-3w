var composingMail = false;

var processCommand = function(command) {
	if (!command) {
		return;
	}
	console.log("Command: " + command);
	command = command.text || command;
	if (command == "stop") {
		$("#player").attr("src", "");
	}
	if ($("#player").attr("src") == "") {
		$("#videopanel").slideUp();
		$("#weatherpanel").find('div').slideDown();
		$("#tweetpanel").find('div').slideDown();
	}
	if (command.match(/compose mail/)) {
		composingMail = true;
	}
	if (command.match(/^hide/)) {
		$('#' + command.split(" ")[1] + "panel").find('div').slideUp();
	}
	if (command.match(/^show/)) {
		$('#' + command.split(" ")[1] + "panel").find('div').slideDown();
	}
	if (command.match(/^show (video|map)/)) {
		$('#' + command.split(" ")[1] + "panel").slideDown();
		$("#weatherpanel").find('div').slideUp();
		$("#tweetpanel").find('div').slideUp();
	}
	if (command.match(/^hide (video|map)/)) {
		$('#' + command.split(" ")[1] + "panel").slideUp();
		$("#tweetpanel").find('div').slideDown();
		$("#weatherpanel").find('div').slideDown();
	}
	if (command.match(/^show marauder/)) {
		$("#maraudermap").hide();
		$("#weatherpanel").find('div').slideUp();
		$("#tweetpanel").find('div').slideUp();
		$("#marauderpanel").slideDown(1000, function() {
			setTimeout($("#maraudermap").fadeIn(1500))
		})
	}
	if (command.match(/^hide marauder/)) {
		$("#maraudermap").fadeOut(1000, function() {
			$("#marauderpanel").slideUp(500, function() {
				$("#weatherpanel").find('div').slideDown();
				$("#tweetpanel").find('div').slideDown();
			});
		});
	}
	return;
}