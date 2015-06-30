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
		    speak("This is Safety Baymax with an M.I.T. emergency update: " + data[alert].replace("Updated ", "").split('. ')[0].replace(/MIT/, "M.I.T."), "", "", "");
		}
         	elem += ("<p style='font-size: 32px'><b>" + alert + "</b></p>" + "<br>" + data[alert].replace("Updated ", ""))
    }
	}
	if (elem.length > 0){
     $('#MITalertspanel').slideDown("slow");
     $('.EMRGpanel').slideDown("slow", function() {
     	$("#MITalerts").html(elem).slideDown();
     });
	} else {
	   $('#MITalertspanel').slideUp('slow');
	}
});

}