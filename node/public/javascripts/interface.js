$(document).ready(function () {

adjustScreenSize();

var headers = document.body.getElementsByTagName('h3');

for (var i = 0; i< headers.length; i++) {
  var elem = headers[i];
  elem.addEventListener("click", function(e){
    var elem = e.target;
    console.log(elem);
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
  var size = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight
    }
  if (size.width < 1000) {
    //console.log("narrow width");
    $('#left-pane').addClass('large-12').removeClass('large-7');
    $('#right-pane').addClass('large-12').removeClass('large-5');
    $('#alertspanel').find('.panel').hide();
    $('#tweetpanel').find('.panel').hide();
  } else {
    $('#left-pane').addClass('large-7').removeClass('large-12');
    $('#right-pane').addClass('large-5').removeClass('large-12');
    $('#alertspanel').find('.panel').show();
    $('#tweetpanel').find('.panel').show();
  }
}

window.onresize = function() {
  adjustScreenSize();
}
