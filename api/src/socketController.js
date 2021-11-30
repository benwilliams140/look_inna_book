const Database = require('./databaseController');

class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;
        this.database = new Database();

        socket.on('registerAccount', (info) => this.handleAccountRegistration(info));
        socket.on('accountLogin', (credentials) => this.handleAccountLogin(credentials));
        socket.on('retrieveBooks', (filter) => this.handleBookSearch(filter));

        this.io.to(this.socket.id).emit('connection');
    }

    handleAccountRegistration(info) {
        this.database.addNewAccount(info)
        .then((user) => {
            this.socket.emit('registrationResult', {
                user: user
            });
        })
        .catch((err) => {
            this.socket.emit('registrationResult', {
                err: err
            });
        });
    }

    handleAccountLogin(credentials) {
        this.database.accountLogin(credentials)
        .then((user) => {
            this.socket.emit('user', user);
        })
        .catch((err) => {
            throw err;
        });
    }

    handleBookSearch(filter) {
        this.database.searchForBooks(filter)
        .then((books) => {
            this.socket.emit('books', books);
        })
        .catch((err) => {
            throw err;
        });
    }
};

function init(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = init;