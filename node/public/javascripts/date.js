function getDate() {

  var aprilfools = [['Tiffany', '#00FFFF'], ['Tracy', '#FF3700'], ['Anita', '#551a8b'], 
  ['Neil'], ['Kim', '#ADFFAD'], ['William','#990033'], ['Noelle', '#00CED1'], 
  ['Abra', '#ADFFAD'], ['Steph McHugh', '#39DB4F'], ['Piper', '#4099FF']];

  var people = [
    ['tiffwang', 'January 1, 1995 00:00:00', 'Tiffany', '#00FFFF'],
    ['xtnbui', 'January 4, 1996 00:00:00', 'Xuan', 'green'],
    ['rjliu', 'January 20, 1995 00:00:00', 'Raymond'],
    ['bmatt', 'January 21, 1993 00:00:00', 'Ben'],
    ['jnation', 'February 4, 1989 00:00:00', 'Josh RT', 'red'],
    ['normandy', 'February 5, 1993 00:00:00', 'Norman'],
    ['gopalan', 'February 8, 1996 00:00:00', 'Diits'],
    ['yzhang17', 'February 13, 1996 00:00:00', 'Yaning', '#29F0E2'],
    ['evayeung', 'February 13, 1993 00:00:00', 'Eva', "#ADFFAD"],
    ['akwasio', 'February 15, 1995 00:00:00', 'Akwasi', 'green'],
    ['oropp', 'March 4, 1996 00:00:00', 'Or', '#7D26CD'],
    //['jwei314', 'March 14, 1993 04:00:00', 'Jenny W'],
    //['jenniez', 'March 24, 1993 00:00:00', 'Jennie Z'],
    ['lotusez3', 'March 24, 1995 00:00:00', 'Elton', '#D391DB'],
    //['mwu2015', 'April 8, 1993 00:00:00', 'Michael Wu', 'red'],
    ['juesato', 'April 21, 1995 00:00:00', 'Jonathan U'],
    ['psigrest', 'April 27, 1996 00:00:00', 'Piper', '#4099FF'],
    ['lcarter', 'May 3, 1995 00:00:00', 'Landon'],
    ['eurahko', 'May 17, 1993 00:00:00', 'Eurah', '#226A87'],
    ['sallylin', 'May 22, 1993 00:00:00', 'Sally'],
    ['tricias', 'May 23, 1995 00:00:00', 'Tricia', '#00ccff'],
    ['huangjd', 'May 26, 1994 00:00:00', 'William', '#990033'],
    ['smmchugh', 'May 26, 1995 00:00:00', 'Steph', 'green'],
    ['abrashen', 'June 2, 1994 00:00:00', 'Abra'],
    ['ncolant', 'July 21, 1995 00:00:00', 'Noelle', '#00CED1'],
    ['stalyc', 'August 10, 1993 00:00:00', 'Staly', 'green'],
    ['anitaliu', 'August 11, 1998 00:00:00', 'Anita', '#551a8b'],
    ['chenbon', 'August 28, 1996 00:00:00', 'Bonnie'],
    ['kkarthur', 'August 29, 1995 00:00:00', 'Bena', 'green'],
    ['mabrams', 'September 2, 1995 00:00:00', 'Melanie', "#9F7EE6"],
    ['saleeby', 'September 20, 1994 00:00:00', 'Kyle'],
    ['harlin', 'September 23, 1993 00:00:00', 'Harlin'],
    ['joshbs', 'September 26, 1996 00:00:00', 'Josh Josh'],
    ['cmzhang', 'October 8, 1993 00:00:00', 'Clare', '#000047'],
    ['rliu42', 'October 10, 1994 00:00:00', 'Runpeng', 'black'],
    ['zsheinko', 'October 28, 1994 00:00:00', 'Zoe', 'red'],
    ['fishr', 'October 31, 1992 00:00:00', 'Fish'],
    ['dfavela', 'November 1, 1996 00:00:00', 'Favela', 'red'],
    ['jamesvr', 'December 12, 1995 00:00:00', 'James'],
    ['tianm', 'December 24, 1993 00:00:00', 'Tian'],
    ['lolzhang', 'December 29, 1995 00:00:00', 'Linda']
      ];

  var toDisplay = 3;

  var now = new Date();
  var bg_color;
  var dict = [];
  var elem = '';

  if ( (now.getHours() < 6) || (now.getHours() > 22) (now.getDay() > 5) ) {
    toDisplay = 5;
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
   var ageIncStr = (age - 0.000001).toFixed(8);
   var fracpart = ageIncStr.substring(ageIncStr.indexOf('.'));
   if (Number(fracpart) + 0.000001 > 1){
    partyTime();
  }
  // April fools
  if (now.getMonth() == 3 && now.getDate() == 1) {
    document.body.className = 'transform';
    r = Math.floor(Math.random()*aprilfools.length);
    elem = 'Happy (un)Birthday <b>' + aprilfools[r][0] + '</b>! &nbsp;';
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
for (var i = dict.length; --i >= dict.length - toDisplay; ) {
  elem += dict[i][1];
}
$("#date").html(elem);

}

