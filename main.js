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
