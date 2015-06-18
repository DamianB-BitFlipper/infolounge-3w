var Firebase = require('firebase');
var nigelRef = new Firebase("https://rliu42.firebaseio.com/nigel");
var pronounce = require('../nigel/pronounce').key;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'safety.baymax@gmail.com',
        pass: 'hairy8a8y'
    }
});

function send(req, res, sms, params) {
	message = params.message + "<br> <br> Sent by Baymax, your personal safety and healthcare companion. Are you satisfied with your care?"
    var mailOptions = {
        from: 'Safety Baymax <safety.baymax@gmail.com>', // sender address
        to: 'rliu42@mit.edu', // list of receivers
        subject: params.subject, // Subject line
        html: "Would send an e-mail to " + params.kerberos + "@mit.edu. <br> <br> Message body: <br> <br>" + message
    };
    params["text"] = "finished mail";
    transporter.sendMail(mailOptions, function(error, info) {
    	var response = "Sorry, Baymax was unable to send the message.";
        if (error) {
        	params["success"] = false;
            console.log(error);
        } else {
        	params["success"] = true;
            response = [ "Baymax has e-mailed: " + (pronounce[params.kerberos] || params.kerberos) + " at M I T dot E D U.", 
            		   	[ "Subject: " + params.subject, "The message body reads: " + params.message] 
            		   ];
        }
        var o = {
            req: req.body.input  || req.params.input,
            std: req.body.input  || req.params.input,
            res: response,
            followup: "",
            cmd: params,
            sms: sms,
            media: ""
        };
        nigelRef.update(o);
        res.json(o);
    });
}

exports.send = send;