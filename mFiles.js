var config = require('./config/dev/peering-server.json');
var exec = require('child_process').exec;
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