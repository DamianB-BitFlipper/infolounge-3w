var lastAlert

//var alertURL = 'http://emergency.mit.net';

/** function getMITAlerts() {

	console.log('BEGINnING !!!');

	var body = document.getElementById('MITalertspanel');

	console.log('LENGTH:');
	console.log(body);
	console.log(String(body));
	console.log(body.length);
	console.log(String(body).length);

	var escapedStr = nodeToString(body).replace( "<" , "&lt;" ).replace( ">" , "&gt;");
	// outputNode.innerHTML += escapedStr;

	console.log(escapedStr);
	console.log(escapedStr.length);

	console.log('OKAY!');


	if (escapedStr.length < 2950) {
		document.getElementById('MITalertspanel').innerHTML = 'Temp infoLounge for all clear';
	}

	var body1 = document.getElementById('MITalertspanel');

	console.log('LENGTH:');
	console.log(body1);
	console.log(String(body1));
	console.log(body1.length);
	console.log(String(body1).length);
	console.log('OKAY!');

}; **/

function getMITAlert() {
   $.getJSON('/institute_alerts.json', function(data){
	if (jQuery.isEmptyObject(data)) {
	   $('#MITalertspanel').slideUp('slow');
	   return;
        }

	var elem = '';

	//console.log(data);
	//console.log('okay thn');

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

exports.getMITAlerts = getMITAlerts;
