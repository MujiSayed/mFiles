// script.js
var exec = require('child_process').exec;
var config = require('./config/dev/peering-server.json');

if(!config.host) {
    logger.info("Please edit host name in /config/dev/peering-server.json");
}
if(!config.sitePort) {
    logger.info("Please edit site host in /config/dev/peering-server.json");
}
var peer = exec('node src/peerserver.js', function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    if (error !== null) {
        console.log('exec error: ', error);
    }
});

peer.on('message', function(message) {
    console.log(message);
});

var mfiles = exec('http-server -a ' + config.host + ' -p ' + config.sitePort + ' -c-1', function(error, stdout, stderr) {
    console.log('stderr: ', stderr);
    if (error !== null) {
        console.log('exec error: ', error);
    }
});

mfiles.on('message', function(message) {
    console.log(message);
});

mfiles.stdout.on('data', function(data) {
    console.log(data.toString());
});

peer.stdout.on('data', function(data) {
    console.log(data.toString());
});

var http = require("http");
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

