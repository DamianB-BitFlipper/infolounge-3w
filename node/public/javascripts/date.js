var now = new Date();
var graduation = (now.getMonth() == 5 && now.getDate() <= 6);
var people = [];
var cruft = [];
var toDisplay;
var remindersSent = {}
var root = new Firebase("https://rliu42.firebaseio.com/infolounge");
var birthdaysRef = root.child("birthdays")
var remindersRef = root.child("birthdayReminders")
var constantsRef = root.child("constants")
var cruftRef = root.child("cruft")
birthdaysRef.on("value", function(ss) {
    people = ss.val() || people;
});
remindersRef.on("value", function(ss) {
    remindersSent = ss.val() || remindersSent;
});
cruftRef.on("value", function(ss) {
    cruft = ss.val() || cruft;
})

function getDate() {

    var toDisplay = 3;
    var bg_color;
    var dict = [];
    var elem = '';

    if ((now.getHours() < 6) || (now.getHours() > 22) || (now.getDay() % 6 == 0)) {
        toDisplay = Math.min(toDisplay, 5);
    }

    if (graduation) {
        toDisplay = 3;
        $('.news-header').html('&nbsp; <span class = "ion-ios-color-wand"></span> memories');
    }

    if (graduation && (now.getSeconds() % 4 == 0)) {
        r = Math.floor(Math.random() * seniors.length);
        var name = seniors[r][0];
        elem = 'Congrats <b>' + name + '</b>! &nbsp;';
        var bg_color = seniors[r][1] || "#860000";
        $('.birthday').find('div').html('<h1>' + elem + '</h1>');
        $('.birthday').css('background-color', bg_color);
        
        //Show the birthday banner (that encloses the senior)
        if(!bannersArray.includes('.birthday'))
            bannersArray.push('.birthday')

        //Remove the warning banner
        var index = bannersArray.indexOf('.warning');
        if(index > -1) 
            bannersArray.splice(index, 1);

        $('.warning').hide();
    }

    if (graduation && now.getSeconds() % 10 == 0) {
        if ($('#news').find('img').css('display') == 'none') {} else {
            $('#news').find('img').fadeOut(function() {
                var img_src = senior_photos[Math.floor(Math.random() * senior_photos.length)];
                var img = "<img class = 'senior-photo' style='display:none' src='" + img_src + "' />";
                $('#news').html(img);
                setTimeout($('#news').find('img').fadeIn(750), 250)
            });
        }
    }

    for (var i in people) {
        var kerberos = people[i][0]
        var age = 0;
        var date = new Date(people[i][1]);
        while (date < now) {
            age++;
            date.setYear(date.getFullYear() + 1);
        }
        age--;
        date.setYear(date.getFullYear() - 1);
        age += (now - date) / 1000 / 60 / 60 / 24 / (now.getYear() % 4 == 0 ? 366 : 365);
        var ageStr = age.toFixed(8);
        var ageIncStr = (age - 0.000005).toFixed(8);
        var fracpart = ageStr.substring(ageStr.indexOf('.'));
        var fracpartInc = ageIncStr.substring(ageIncStr.indexOf('.'));
        if (Number(fracpart) > 0.9999980) {
            document.getElementById('clock').innerHTML = dateFormat(now, 'H:MM:ss');
        }
        // April fools
        if (now.getMonth() == 3 && now.getDate() == 1) {
            document.body.className = 'transform';
        }
        //Birthdays
        if (Number(fracpart) < 0.0025 && !(now.getHours() >= 2 && now.getHours() <= 7)) {
            elem += 'Happy Birthday <b>' + people[i][2] + '</b>! &nbsp;';
            var bg_color = people[i][3] || "orange";
            
        }
        if (Number(fracpart) > 1 - 1.0 / (now.getYear() % 4 == 0 ? 366 : 365) / 2) {
            //if (now.getHours() == date.getMonth() + 1 && now.getMinutes() == date.getDate() && now.getSeconds() > 20) {
            if (!remindersSent[kerberos] || remindersSent[kerberos].indexOf(now.getYear()) < 0) {
                remindBirthday(kerberos);
            }
            //}
        }
        dict.push([fracpartInc, '<div class="subdate">' + kerberos + ' is ' + ageStr + ' years old</div>']);

    }
    dict.sort();

    //After going through all of the people, populate the `birthday` field with the data in `elem`
    if (elem.length > 1) {
        $('.birthday').find('div').html('<h1>' + elem + '</h1>');
        $('.birthday').css('background-color', bg_color);
        
        //Show the birthday banner
        if(!bannersArray.includes('.birthday'))
            bannersArray.push('.birthday')

    } else {
        //Remove the birthday banner
        var index = bannersArray.indexOf('.birthday');
        if(index > -1) 
            bannersArray.splice(index, 1);
        
        $('.birthday').hide();
    }


    if (now.getMonth() == 8)
        var elem = dateFormat(now, 'ddd, d mmm');
    else
        var elem = dateFormat(now, 'ddd, d mmmm');
    for (var i = dict.length; --i >= dict.length - toDisplay;) {
        elem += dict[i][1];
    }
    $("#date").html(elem);

}

function remindBirthday(kerberos) {
    if (remindersSent[kerberos]) {
        remindersSent[kerberos].push(now.getYear());
    } else {
        remindersSent[kerberos] = [now.getYear()];
    }
    $.ajax("/birthday?kerberos=" + kerberos, {
        success: function(data) {
            console.log(data)
            if (data.success) {
                remindersRef.child(kerberos).once("value", function(ss) {
                    var sent = ss.val() || [];
                    sent.push(now.getYear());
                    remindersRef.child(kerberos).set(sent);
                });
            } else {
                remindersSent[kerberos].pop()
            }
        }
    });
}
