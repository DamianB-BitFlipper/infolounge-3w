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
    if (/hide/.test(command)) {
        var panel = command.replace(/(.*)?hide ([\w]+)(.*)?/, "$2panel");
        $('#' + panel).find('div').slideUp();
    }
    if (/show/.test(command)) {
        var panel = command.replace(/(.*)?show ([\w]+)(.*)?/, "$2panel");
        $('#' + panel).find('div').slideDown();
    }
    if (/show (video|map)/.test(command)) {
        var panel = command.replace(/(.*)?show (video|map)(.*)?/, "$2panel");
        $('#' + panel).slideDown();
        $("#weatherpanel").find('div').slideUp();
        $("#tweetpanel").find('div').slideUp();
    }
    if (/hide (video|map)/.test(command)) {
        var panel = command.replace(/(.*)?hide (video|map)(.*)?/, "$2panel");
        $('#' + panel).slideUp();
        $("#tweetpanel").find('div').slideDown();
        $("#weatherpanel").find('div').slideDown();
    }
    if (/show marauder/.test(command)) {
        $("#maraudermap").hide();
        $("#weatherpanel").find('div').slideUp();
        $("#tweetpanel").find('div').slideUp();
        $("#marauderpanel").slideDown(1000, function() {
            setTimeout($("#maraudermap").fadeIn(1500));
        });
    }
    if (/hide marauder/.test(command)) {
        $("#maraudermap").fadeOut(1000, function() {
            $("#marauderpanel").slideUp(500, function() {
                $("#weatherpanel").find('div').slideDown();
                $("#tweetpanel").find('div').slideDown();
            });
        });
    }

    if (/baymax/.test(command)) {
        $('#content').slideUp(1000, function() {
            $("#baymax").fadeIn(1000);
            setInterval(function() {
                if (new Date().getTime() - lastAction > 60000) {
                    $("#baymax").fadeOut(1000, function() {
                        $('#content').slideDown();
                    });
                }
            }, 60000);
        });
    }

    return;
}