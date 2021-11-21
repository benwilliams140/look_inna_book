//const database = require('./databaseController');

class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;

        socket.on('message', (message) => this.handleMessage(message));

        this.io.to(this.socket.id).emit('connection');
    }

    handleMessage(message) { 
        this.io.to(this.socket.id).emit('message', message);
    }
};

function init(io) {
    console.log('socket server listening');
    io.on('connection', (socket) => {
        new Connection(io, socket)
    })
}

module.exports = init;