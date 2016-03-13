// script.js
var exec = require('child_process').exec;
var config = require('./config/dev/peering-server.json');

if(!config.host) {
    logger.info("Please edit host name in /config/dev/peering-server.json");
}
if(!config.sitePort) {
    logger.info("Please edit site host in /config/dev/peering-server.json");
}
var peer = exec('node src/server.js', function(error, stdout, stderr) {
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
//var dispatcher = require('httpdispatcher');
//
//function handleRequest(request, response){
//    try {
//        //log the request on console
//        console.log("here",request.url);
//        //Disptach
//        console.log(request);
//        dispatcher.dispatch(request, response);
//    } catch(err) {
//        console.log(err);
//    }
//}
//
////A sample POST request
//dispatcher.onPost("/sendEmail", function(req, res) {
//    console.log("here");
//    console.log(req.body);
//    res.json(req.body);
//});
//
//var server = http.createServer();
//server.on('request', function(request, response) {
//    console.log(request);
//    var method = request.method;
//    var url = request.url;
//    console.log(method, url);
//    var body = [];
//    request.on('data', function(chunk) {
//        body.push(chunk);
//        console.log("data");
//    }).on('end', function() {
//        body = Buffer.concat(body).toString();
//        console.log("end1", body, "lll");
//    });
//    console.log("end");
//});
//
if(config.email && parseInt(config.email.emailServerPort)) {
    var express = require('express'),
     app = express(),
     http = require('http').Server(app),
     logger = require('morgan'),
     cookieParser = require('cookie-parser'),
     bodyParser = require('body-parser'),
     cors = require('cors');
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(cors())
    app.post('/sendEmail', function(req, res, next) {
            console.log(req.body);
            res.send({success:true,message:"Invalid path"});
        });
    http.listen(parseInt(config.email.emailServerPort), function(){
        console.log("Mail server started on port " + parseInt(config.email.emailServerPort));
    });
} else {
    console.log("Please set port in config file to use mail service");
}


//http.createServer(function(request, response) {
//    var headers = request.headers;
//    console.log(headers);
//    var method = request.method;
//    var url = request.url;
//    var body = [];
//    request.header('Access-Control-Allow-Origin', '*');
//    request.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//    request.header('Access-Control-Allow-Headers', 'Content-Type');
//    request.on('error', function(err) {
//        console.error(err);
//    }).on('data', function(chunk) {
//        body.push(chunk);
//    }).on('end', function() {
//        body = Buffer.concat(body).toString();
//        // BEGINNING OF NEW STUFF
//        console.log(body);
//        response.on('error', function(err) {
//            console.error(err);
//        });
//
//        response.statusCode = 200;
//        response.setHeader('Content-Type', 'application/json');
//        // Note: the 2 lines above could be replaced with this next one:
//        // response.writeHead(200, {'Content-Type': 'application/json'})
//
//        var responseBody = {
//            headers: headers,
//            method: method,
//            url: url,
//            body: body
//        };
//
//        response.write(JSON.stringify(responseBody));
//        response.end();
//        // Note: the 2 lines above could be replaced with this next one:
//        // response.end(JSON.stringify(responseBody))
//
//        // END OF NEW STUFF
//    });
//}).listen(8080);
