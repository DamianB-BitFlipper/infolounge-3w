var alertsURL = '/alerts.json';

function getAlerts() {
	var elem = '';
	console.log('ELEM:'+elem);

	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.open("GET","http://alerts.weather.gov/cap/wwaatmget.php?x=MAZ014&y=0",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 

	var x=xmlDoc.getElementsByTagName("entry");
	for (i=0;i<x.length;i++)
	  { 
	  elem += x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
	  elem += x[i].getElementsByTagName("summary")[0].childNodes[0].nodeValue;
	  }

	console.log('ELEM:'+elem);
        $("#alerts").html(elem);

};
