angular.module('config', []).value('config', {
	'debug': true,
	'limit': 10,
	'peerIdLength': 6,
	'fileIdLength': 4,
	'chunkSize': 15000,
	'chunksPerBlock': 64,
	'peerConfig': {
		//host: 'localhost',
        host: 'localhost',
		path: '/signaling',
		port: 9100,
		key: 'reepio',
		config: {
			iceServers: [
				{url: "stun:1.1.1.1"},
				//...
			]
		}
	}
});
