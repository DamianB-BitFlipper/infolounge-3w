function getDate() {
  var people = [
    ['tiffwang', 'January 1, 1995 00:00:00', 'Tiffany'],
    ['xtnbui', 'January 4, 1996 00:00:00', 'Xuan'],
    ['yzhang17', 'February 13, 1996 00:00:00', 'Yaning', '#33ADFF'],
    ['evayeung', 'February 13, 1993 00:00:00', 'Eva', "#ADFFAD"],
    ['akwasio', 'February 15, 1995 00:00:00', 'Akwasi', 'green'],
    ['jwei314', 'March 14, 1993 04:00:00', 'Jenny W'],
    ['jenniez', 'March 24, 1993 00:00:00', 'Jennie Z'],
    ['lotusez3', 'March 24, 1995 00:00:00'],
    ['mwu2015', 'April 8, 1993 00:00:00', 'Michael Wu'],
    ['juesato', 'April 21, 1995 00:00:00', 'Jonathan U'],
    ['cmzhang', 'October 8, 1993 00:00:00', 'Clare', '#000047'],
    ['eurahko', 'May 17, 1993 00:00:00', 'Eurah'],
    ['sallylin', 'May 22, 1993 00:00:00', 'Sally'],
    ['tricias', 'May 23, 1995 00:00:00', 'Tricia', '#33CCFF'],
    ['huangjd', 'May 26, 1994 00:00:00', 'William', '#990033'],
    ['chenbon', 'August 28, 1996 00:00:00', 'Bonnie'],
    ['kkarthur', 'August 29, 1995 00:00:00', 'Bena', 'green'],
    ['mabrams', 'September 2, 1995 00:00:00', 'Melanie', "#CC66FF"],
    ['harlin', 'September 23, 1993 00:00:00', 'Harlin'],
    ['joshbs', 'September 26, 1996 00:00:00', 'Josh Josh'],
    ['rliu42', 'October 10, 1994 00:00:00', 'Runpeng', 'black'],
    ['zsheinko', 'October 28, 1994 00:00:00', 'Zoe', 'red']
      ];
    var now = new Date();
    var bg_color;
    var dict = [];
    var elem = '';
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
        var ageIncStr = (age - 0.000001).toFixed(8);
	var fracpart = ageIncStr.substring(ageIncStr.indexOf('.'));
	if (Number(fracpart) + 0.000001 > 1){
		partyTime();
		//happyBirthday(people[i][2]);
	}
	if (Number(fracpart) < 0.0026) {
		elem += 'Happy Birthday <b>' + people[i][2] + '</b>! &nbsp;';
    var bg_color = people[i][3] || "orange";
	}
	if (elem.length > 1) {
		$('.birthday-m').find('div').html('<h1>' + elem + '</h1>');
    $('.birthday').find('div').html('<h1>' + elem + '</h1>');
    //console.log(people[i][3]);
    $('.birthday-m').css('background-color', bg_color);
    $('.birthday').css('background-color', bg_color);
    var windowWidth = window.innerWidth || document.body.clientWidth;
    if (windowWidth < 1000){
      //$('.birthday-m').show();
    } else {
      $('.birthday').show();
    }
		$('.warning').hide();
	} else {
		$('.birthday').hide();
		$('.warning').show();
	}
	dict.push([fracpart, '<div class="subdate">' + people[i][0] + ' is ' + ageStr + ' years old</div>']);

    }
    dict.sort();
    if (now.getMonth() == 8)
        var elem = dateFormat(now, 'ddd, d mmm');
    else
        var elem = dateFormat(now, 'ddd, d mmmm');
    for (var i = dict.length; --i >= dict.length - 3; ) {
	elem += dict[i][1];
    }
    $("#date").html(elem);
}

var partyTime = function() {
	var x = (now.getSeconds() <= 20 ? "d" : "g")
		$.ajax({url: "http://localhost:8001/" + x,
			success: function(data){return;}
                });
}
