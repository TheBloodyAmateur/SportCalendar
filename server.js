const WebSocket = require('ws');
const server = new WebSocket.Server({port:'8080'})

server.on('connection', socket => {

    console.log("New client connected!");

    //Recieving data from the client
    socket.on('message', message => {
        console.log(`Got it, ${message}`);
        socket.send(`Got message: ${message}`);
    });

    //Message pops up when the client is closing the connection
    socket.on('close', function(){
        console.log('Client closed!');
    });
    
});