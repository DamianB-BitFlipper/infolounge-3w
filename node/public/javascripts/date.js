function getDate() {

  var aprilfools = [['Tiffany', '#00FFFF'], ['Tracy', '#FF3700'], ['Anita', '#551a8b'], 
  ['Neil'], ['Kim', '#ADFFAD'], ['Michael X', 'red'], 
  ['William','#990033'], ['Sumit', '#6FA252'], ['Staly', '#228b22'], 
  ['Noelle', '#00CED1'], ['Abra', '#ADFFAD'], ['Steph McHugh', '#39DB4F'], 
  ['Piper', '#4099FF']];

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
    if (now.getMonth() == 3 && now.getDate() == 1) {
        document.body.className = 'transform';
      r = Math.floor(Math.random()*aprilfools.length);
      elem = 'Happy <span style=font-size:"12px">(un)</span>Birthday <b>' + aprilfools[r][0] + '</b>! &nbsp;';
      var bg_color = aprilfools[r][1] || "orange";  
    } else {
	if (Number(fracpart) < 0.0026) {
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
