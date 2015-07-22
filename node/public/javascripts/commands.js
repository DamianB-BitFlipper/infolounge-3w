var processCommand = function(command) {
    if (!command) {
        return;
    }
    command = command.text || command;
    entity = (command.voice || {}).entity || "Baymax";
    console.log("Command: " + command);
    if (/stop/.test(command)) {
        $("#player").attr("src", "");
        $("#wave").fadeOut(1000, function(){wave.stop();});
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
        if ($("#baymax").css("display") != "none") {
            $("#baymax").fadeOut(1000, function() {
                $("#content").slideDown();
            });
        }
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
    if (!/show/.test(command)) {
        showBaymax();
        if (entity == "Siri") {
            showSiri();
        } else {
            $("#siri").fadeOut(500);
        }
        if (entity == "Jarvis") {
            showJarvis();
        } else {
            $("#jarvis").fadeOut(500, function(){
                $('#baymax').css("background-color", "white");
                $("#baymax-eyes").fadeIn(500);
                wave.color = "192,192,192";
            });
        }
    }
    if (/deactivate/.test(command)) {
        setTimeout(function() {
            hideBaymax();
        }, 10000);
    }
    return;
}

function showBaymax() {
    if ($('#content').css("display") != "none") {
        $('#content').slideUp(1000, function() {
                $("#baymax").fadeIn(1000, function() {
                    wave.start();
                });
        });
    }
}

function hideBaymax() {
    if ($('#baymax').css("display") != "none") {
        $("#wave").fadeOut(1000, function(){wave.stop();});
        $('#baymax').fadeOut(1000, function() {
                $("#content").slideDown(1000);
        });
    }
}

function showSiri() {
    $("#jarvis").fadeOut();
    $("#siri").fadeIn();
    wave.color = "192,192,192";
}

function showJarvis() {
    $("#baymax-eyes").fadeOut(function(){
        $('#baymax').css("background-color", "black");
        $("#jarvis").fadeIn();
        wave.color = "25,192,192";
    });
}

function showImage(url) {
    I = new Image();
    I.src = url; h = I.height; w = I.width;
    me = $("#baymax-image");
    me.fadeOut(100, function() {
        me.css("width", "600px");
        me.css("height", Math.floor(600*h/w) + "px");
        me.css("background-size", "600px " + Math.floor(600*h/w) + "px");
        me.css("background-image", "url('" + url + "')");
        me.fadeIn(1000);
    });
}