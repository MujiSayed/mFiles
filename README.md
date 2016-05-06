# mFiles

mFiles ridiculously simple file sharing. With mFiles you can transfer files directly to another browser securely. Just point to a file you want to share.  Share the unique file link.  Keep your browser open until the file has been downloaded.  Your files will  be downloaded directly from your computer through the browser over SSL.  No data is stored on a server. Transfer occurs between you and the destination...peer to peer, browser to browser. mFiles use RTC technology to share file between browsers. Please click here <a href="http://www.webrtc.org/"> know more about RTC technology </a>.

#Uses
1. Upload file by click on 'Add or drop file button'.
2. Url will automatically generate for this file to transfer.
3. Copy generate url and sent it to end user.
4. You can set password after upload the file and provide same password while download file.

#Installation
1. We assumed you have already node.js environment, If not please click <a href="https://nodejs.org/download/">Here<a> download and install first.
2. Pull project or simple download zipped project.
3. To run project run command "sudo npm start". Required dependencies will automatically download. If it's failed to download or install dependencies due to network failure or others, please try again with "sudo npm start".
4. After successfull start Client server will listen on post 8001 and peer server listen on port 9100.
5. To start file transfer please visit http://localhost:8001/.
6. If you close the browser after upload files and before download, Then it will not transfer to end user because mFiles used browse to browser sharing.

edit the config file "config/dev/peering-server.js" and "publicconfig.js".
make sure you are using free port.

for email server:
you may please set your gmail account to login via other application. here is link:
https://support.google.com/accounts/answer/6010255?hl=en
https://www.google.com/settings/security/lesssecureapps
you need to "turn on" gmail.


Please edit following in config\dev\peering-server.json file auth, from & emailServerPort(any free port)
"emailServer" in public/config.json


run:
to start project run "npm start".

if its not working it means some proccess already running.

try to list node running file with command "ps aux | grep node"
if any file running of mFile project you should kill by pid and try again.


#Setting
There is two setting file in project, You can edit these file as your's per uses.<br>
<b>1. /config/peering-server.json</b>
    > host: Default value is 127.0.0.1. You can set host name or ip address of server computer
    > sitePort: Default port number is 8001. Set web port number for access website.
    > peerServerPort: Default port number is 9100. Peer server port number on which peer server will able to listen.
    > ssl: Default value is 'false'. If you want to use ssl set it to 'true'.
    > sslKey: File path of the ssl key.
    > sslCertificate: File path of the ssl certificate.

<i>Other Options: </i><br>
    > path<br>
    > statsInterval<br>
    > ipLimit<br>
    > concurrentLimit<br>

<b>2. public/config.js</b><br>
    > peerConfig: peer server configuration setting, it's have following options.<br>
        > host: default value is current host name or ip. set peer server host.<br>
        > port: default value is 9100, should be exact same value defined for peerServerPort in previous setting.<br>
        > path: default /signaling, should be exact same value defined for path in previous setting.<br>
        > key: default value is mfiles, should be exact same value defined for key in previous setting.<br>

#License

Copyright (C) 2015  MicroHealthLLC

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
