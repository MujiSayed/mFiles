// script.js
var exec = require('child_process').exec;

var peer = exec('node src/server.js', function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    if (error !== null) {
        console.log('exec error: ', error);
    }
});

peer.on('message', function(message) {
	console.log(message);
});

var mfiles = exec('http-server -a localhost -p 8001 -c-1', function(error, stdout, stderr) {
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