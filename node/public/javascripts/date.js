
function getDate() {
    var now = new Date();

var people = [
  ['evayeung', 'February 13, 1993 00:00:00', 'Eva'],
	['3dg42', 'April 19, 1993 00:00:00'],
	['jcorzo', 'January 18, 1993 00:00:00'],
	['zsheinko', 'October 28, 1994 00:00:00', 'Zoe'],
	['mabrams', 'September 2, 1995 00:00:00', 'Melanie'],
	['jenniez', 'March 24, 1993 00:00:00', 'Jennie'],
	['jwei314', 'March 14, 1993 04:00:00', 'Jenny'],
	['cmzhang', 'October 8, 1993 00:00:00', 'Clare'],
	['eurahko', 'May 17, 1993 00:00:00', 'Yourah'],
	['harlin', 'September 23, 1993 00:00:00', 'Harlin'],
	['rliu42', 'February 10, 1994 00:00:00', 'Runpeng'],
	['juesato', 'April 21, 1995 00:00:00', 'Jonathan'],
	['yzhang17', 'February 13, 1996 00:00:01', 'Yaning'],
	['xtnbui', 'January 4, 1996 00:00:00', 'Swun'],
	['tricias', 'May 23, 1995 00:00:00', 'Tricia'],
	['tiffwang', 'January 1, 1995 00:00:00', 'Tiffany'],
	['lotusez3', 'March 24, 1995 00:00:00'],
	['kkarthur', 'August 29, 1995 00:00:00', 'Bena'],
	['chenbon', 'August 28, 1996 00:00:00', 'Bonnie'],
	['akwasio', 'February 15, 1995 00:00:00', 'Akwahsi'],
	['mwu2015', 'April 8, 1993 00:00:00', 'Michael Wu'],
	['sallylin', 'May 22, 1993 00:00:00', 'Sally'],
	['huangjd', 'May 26, 1994 00:00:00', 'William'],
	['joshbs', 'September 26, 1996 00:00:00', 'Josh Josh']
    ];

    var dict = [];
    var elem = '';
    for (var i = 0; i < people.length; i += 1) {
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
	if (Number(fracpart) < 0.0025) {
		elem += 'Happy Birthday ' + people[i][0] + '! &nbsp;';
	}
	if (elem.length > 1) {
		$('.birthday').find('div').html('<h1>' + elem + '</h1>');
		$('.birthday').show();
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
