var now = new Date();
var graduation = (now.getMonth() == 5 && now.getDate() <= 6);
var people;
var birthdaysRef = new Firebase("https://rliu42.firebaseio.com/infolounge/birthdays")
function getDate() {

    var aprilfools = [
        ['Tiffany', '#00FFFF'],
        ['Tracy', '#FF3700'],
        ['Anita', '#551a8b'],
        ['Neil'],
        ['Kim', '#ADFFAD'],
        ['William', '#990033'],
        ['Noelle', '#00CED1'],
        ['Abra', '#ADFFAD'],
        ['Steph McHugh', '#39DB4F'],
        ['Piper', '#4099FF']
    ];

    if (!people) {
        birthdaysRef.once("value", function(ss) {
            people = ss.val();
        });
    }
    
    var toDisplay = 3;
    var bg_color;
    var dict = [];
    var elem = '';

    if ((now.getHours() < 6) || (now.getHours() > 22) || (now.getDay() % 6 == 0)) {
        toDisplay = 5;
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
        $('.birthday').show();
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

    for (var i = 0; i < people.length; i++) {
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
            r = Math.floor(Math.random() * aprilfools.length);
            elem = 'Happy (un)Birthday <b>' + aprilfools[r][0] + '</b>! &nbsp;';
            var bg_color = aprilfools[r][1] || "orange";
        } else {
            if (Number(fracpart) < 0.0025) {
                elem += 'Happy Birthday <b>' + people[i][2] + '</b>! &nbsp;';
                var bg_color = people[i][3] || "orange";
            }
        }
        if (elem.length > 1) {
            $('.birthday').find('div').html('<h1>' + elem + '</h1>');
            $('.birthday').css('background-color', bg_color);
            $('.birthday').show();
            $('.warning').hide();
        } else {
            //$('.birthday').hide();
            //$('.warning').show();
        }
        dict.push([fracpartInc, '<div class="subdate">' + people[i][0] + ' is ' + ageStr + ' years old</div>']);

    }
    dict.sort();
    if (now.getMonth() == 8)
        var elem = dateFormat(now, 'ddd, d mmm');
    else
        var elem = dateFormat(now, 'ddd, d mmmm');
    for (var i = dict.length; --i >= dict.length - toDisplay;) {
        elem += dict[i][1];
    }
    $("#date").html(elem);

}