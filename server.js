const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9000 });

console.log('server listening on port 9000')
const clients = [];
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    console.log('a client connected');
    
    ws.send('something');
    clients.push(ws);

    ws.on('open', function open() {
        ws.send('test');
    })
});
console.log('server listening on port 9000');

 const broadcast = (msg) => {
    console.log('total client:' + clients.length)
    clients.forEach(ws => {
        ws.send(msg);
    })
}
module.exports = {
    broadcast
}