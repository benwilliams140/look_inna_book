const Database = require('./databaseController');

class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;
        this.database = new Database();

        socket.on('registerCustomer', (customer) => this.handleCustomerRegistration(customer));
        socket.on('customerLogin', (credentials) => this.handleCustomerLogin(credentials));

        this.io.to(this.socket.id).emit('connection');
    }

    handleCustomerRegistration(customer) {
        this.database.addNewCustomer(customer);
    }

    handleCustomerLogin(credentials) {
        this.database.customerLogin(credentials)
        .then((user) => {
            this.socket.emit('user', user);
        })
        .catch((err) => {
            throw err;
        });
    }

    handleMessage(message) { 
        this.io.to(this.socket.id).emit('message', message);
    }
};

function init(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = init;