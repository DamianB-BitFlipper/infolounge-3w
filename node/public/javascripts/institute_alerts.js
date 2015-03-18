var lastAlert;

function getMITAlert() {

$.getJSON('/institute_alerts.json', function(data){

  if (jQuery.isEmptyObject(data)) {
     $('#MITalertspanel').slideUp('slow');
      return;
  }

	var elem = '';

	for (var alert in data) {
	  if (data[alert].length > 20) {
		if (lastAlert !== data[alert]) {
		    lastAlert = data[alert];
		    speak("This is Nigel with an MIT emergency update. " + dateToSpeech(data[alert]).split('. ')[0]);
		}
         	elem += ("<p style='font-size: 32px'><b>" + alert + "</b></p>" + "<br>" + data[alert])
    }
	}
	if (elem.length > 0){
	   $("#MITalerts").html(elem);
     $('#MITalertspanel').slideDown("slow");
	} else {
	   $('#MITalertspanel').slideUp('slow');
	}
});

}

function nodeToString ( node ) {
   var tmpNode = document.createElement( "div" );
   tmpNode.appendChild( node.cloneNode( true ) );
   var str = tmpNode.innerHTML;
   tmpNode = node = null; // prevent memory leaks in IE
   return str;
}
