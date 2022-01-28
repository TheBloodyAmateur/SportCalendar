const WebSocket = require('ws');
const server = new WebSocket.Server({port:'8080'})

server.on('connection', socket => {

    console.log("New client connected!");

    socket.on('message', message => {
        console.log(`Got it, ${message}`);
    });

    socket.on('close', function(){
        console.log('Client closed!');
    });
    
});