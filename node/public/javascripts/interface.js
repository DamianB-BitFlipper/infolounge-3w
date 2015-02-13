var loaded = false;
var windowSize;

$(document).ready(function () {

adjustScreenSize();

var headers = document.body.getElementsByTagName('h3');

for (var i = 0; i< headers.length; i++) {
  var elem = headers[i];
  elem.addEventListener("click", function(e){
    var elem = e.target;
    //console.log(elem);
    var panel = $($(elem).parent().find('.panel'));
    if (panel.css('display') == 'none') {
        panel.slideDown();
        return;
    } else {
        panel.slideUp();
    }
  });
};

});

var adjustScreenSize = function() {
  $('.mobile').hide();
  var size = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    }
  windowSize = size;

  if (size.width < 1000) {
    //console.log("narrow width");
    //$('.mobile').show();
    //$('.right-panel').hide();
    $('#left-pane').addClass('large-12').removeClass('large-7');
    $('#right-pane').addClass('large-12').removeClass('large-5');
    if (!loaded) {
      $('#tweetpanel').find('.panel').hide();
      $('#alertspanel').find('.panel').hide();
      loaded = true;
    }
    $('h3').removeClass('header').addClass('header-m');
    $('#version').addClass('version-m').html('mobile');
    $('#title').addClass('title-m');
    $('#date').removeClass('date').addClass('date-m');
    $('#menu').removeClass('menu').addClass('menu-m');
    $('#predictions').removeClass('pred').addClass('pred-m');
    $('.weather-temp').addClass('weather-temp-m').removeClass('weather-temp');
    $('.weather-feel').addClass('weather-feel-m').removeClass('weather-feel');
    $('#clock').hide();
    $('.birthday').hide();
    $('.column').css('margin-bottom', '2.5vh');
    $('.row').css('margin-bottom', '1.0vh');
    $('.icon-m').show();
  } else {
    //$('.right-panel').show();
    $('#left-pane').addClass('large-7').removeClass('large-12');
    $('#right-pane').addClass('large-5').removeClass('large-12');
    $('#alertspanel').find('.panel').show();
    $('#tweetpanel').find('.panel').show();
    $('h3').removeClass('header-m').addClass('header');
    $('#version').html('beta v2.8');
    $('#clock').show();
    $('#date').removeClass('date-m').addClass('date');
    $('#menu').removeClass('menu-m').addClass('menu');
    $('#predictions').removeClass('pred-m').addClass('pred');
    $('.birthday-m').hide();
    $('icon-m').hide();
  }
}

window.onresize = function() {
  adjustScreenSize();
}
