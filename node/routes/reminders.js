var request = require('request');
var birthdayURL = "http://72.29.29.198:1337/birthday/"

function remindBirthday(req, res) {
	console.log(birthdayURL + req.params.kerberos)
    request(birthdayURL + req.params.kerberos, function(error, response, body) {
        if (error || response.statusCode != 200) {
            console.log(error);
            res.json({});
            return;
        };
        res.json({success:true})
    })
}

exports.birthday = remindBirthday
