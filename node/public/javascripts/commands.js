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
    if (/^hide/.test(command)) {
        $('#' + command.split(" ")[1] + "panel").find('div').slideUp();
    }
    if (/^show/.test(command)) {
        $('#' + command.split(" ")[1] + "panel").find('div').slideDown();
    }
    if (/^show (video|map)/.test(command)) {
        $('#' + command.split(" ")[1] + "panel").slideDown();
        $("#weatherpanel").find('div').slideUp();
        $("#tweetpanel").find('div').slideUp();
    }
    if (/^hide (video|map)/.test(command)) {
        $('#' + command.split(" ")[1] + "panel").slideUp();
        $("#tweetpanel").find('div').slideDown();
        $("#weatherpanel").find('div').slideDown();
    }
    if (/^show marauder/.test(command)) {
        $("#maraudermap").hide();
        $("#weatherpanel").find('div').slideUp();
        $("#tweetpanel").find('div').slideUp();
        $("#marauderpanel").slideDown(1000, function() {
            setTimeout($("#maraudermap").fadeIn(1500))
        })
    }
    if (/^hide marauder/.test(command)) {
        $("#maraudermap").fadeOut(1000, function() {
            $("#marauderpanel").slideUp(500, function() {
                $("#weatherpanel").find('div').slideDown();
                $("#tweetpanel").find('div').slideDown();
            });
        });
    }
    return;
}