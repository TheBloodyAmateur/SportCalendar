const WebSocket = require('ws');
const socket = new Websocket('ws://localhost:8080');

socket.onmessage = ({data}) => {
    console.log('Message from server ', data);
}