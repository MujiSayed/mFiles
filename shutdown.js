var forever = require("forever");

var stop = function() {
    forever.list(0, function (err, process) {
        if(process) {
            for (var i = 0; i < process.length; i++) {
                if (process[i].file.indexOf("mFiles.js") > 0) {
                    console.log("Stoping mFile server");
                    forever.stop(i);
                }
                if (process[i].file.indexOf("peerserver.js") > 0) {
                    console.log("Stoping peer server");
                    forever.stop(i);
                }
                if (process[i].file.indexOf("email.js") > 0) {
                    console.log("Stoping email server");
                    forever.stop(i);
                }
            }
        }

    });
}
stop();