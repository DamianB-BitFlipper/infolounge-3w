var institute_alertsURL = '/institute_alerts.json';

function getMITAlertJSON() {
    output.log('Begin test!');

    request(alertURL, function(error, response, body) {
        var now = new Date();

        var startIndex = body.indexOf('<div id="contentannouncebox">');
	output.log('Hello there:');
	output.log(startIndex);
        var data = body.substring(startIndex, body.indexOf('</div>', startIndex));
        var alertsStr = data.match(/[^<>]{9,9999}/g); // ignore html tags
        var alerts = {};
        for (i = alertsStr.length; --i >= 0; ) {
            if (now.getTime() - new Date(alertsStr[i]).getTime() < 1000 * 60 * 60 * 10 /* 10 hours */) {
                alerts[alertsStr[i]] = alertsStr[i + 1];
            }
            if (Object.keys(alerts).length >= 1) {
                break;
            }
        }

    });
};

function getMITAlerts() {
	$.getJSON(institute_alertsURL, getMITAlertJSON());
};

exports.getMITAlerts = getMITAlerts;
