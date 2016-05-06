var http = require("http");
var config = require('./config/dev/peering-server.json');
if(config.email && parseInt(config.email.emailServerPort)) {
    var express = require('express'),
        app = express(),
        http = require('http').Server(app),
        logger = require('morgan'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        nodemailer = require('nodemailer');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(cors())
    app.post('/sendEmail', function(req, res, next) {

        var subject = req.body.subject,
            emails = req.body.emails,
            content = req.body.content;

        if(!subject) {
            return res.send({success:false,message:"Please enter subject"});
        } else if(!emails) {
            return res.send({success:false,message:"Please enter emails"});
        } else if(!content) {
            return res.send({success:false,message:"Please enter content"});
        } else {
            var auth = typeof config.email.gmail.auth != 'undefined'?config.email.gmail.auth:false;

            if(auth) {
                content = '<html><body>'+content+'<br /><br /><img src="https://www.microhealthllc.com/wp-content/themes/microhealth/images/logo.png" width="150px" /> </body></html>'
                var url = 'smtps://'+auth.email+':'+auth.password+'@smtp.gmail.com';

                var transporter = nodemailer.createTransport(url);
                var mailOptions = {
                    from: config.email.from, // sender address
                    to: emails,
                    cc: config.email.cc,
                    bcc: config.email.bcc,
                    subject: subject, // Subject line
                    html: content // html body
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        console.log(error);
                        return res.send({success:false,message:"Please try after some time"});
                    }
                    return res.send({success:true,message:info.response});
                });
            } else {
                return res.send({success:false,message:"Please try after some time"});
            }
        }
    });
    http.listen(parseInt(config.email.emailServerPort), function(){
        console.log("Mail server started on port " + parseInt(config.email.emailServerPort));
    });
} else {
    console.log("Please set port in config file to use mail service");
}

