const Database = require('./databaseController');

class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;
        this.database = new Database();

        socket.on('registerAccount', (info) => this.handleAccountRegistration(info));
        socket.on('accountLogin', (credentials) => this.handleAccountLogin(credentials));
        socket.on('retrieveBooks', (filter) => this.handleBookSearch(filter));
        socket.on('retrievePublishers', () => this.handlePublisherRequest());
        socket.on('retrieveAuthors', () => this.handleAuthorRequest());
        socket.on('retrieveGenres', () => this.handleGenreRequest());
        socket.on('addLocation', (locationInfo) => this.handleLocationAddition(locationInfo));
        socket.on('addPublisher', (publisherInfo) => this.handlePublisherAddition(publisherInfo));
        socket.on('addAuthor', (authorInfo) => this.handleAuthorAddition(authorInfo));
        socket.on('addGenre', (genreInfo) => this.handleGenreAddition(genreInfo));
        socket.on('addBook', (bookInfo) => this.handleBookAddition(bookInfo));

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
            console.log('Error logging in, please try again.');
        });
    }

    handleBookSearch(filter) {
        this.database.searchForBooks(filter)
        .then((books) => {
            this.socket.emit('books', books);
        })
        .catch((err) => {
            console.log('Error searching for book');
        });
    }

    handleLocationAddition(locationInfo) {
        this.database.addLocation(locationInfo)
        .then(() => {
            this.socket.emit('locationAdded');
        })
        .catch((err) => {
            console.log('Error adding location');
        });
    }

    handlePublisherAddition(publisherInfo) {
        this.database.addPublisher(publisherInfo)
        .then((res) => {
            this.socket.emit('publisherAdded', res);
        })
        .catch((err) => {
            console.log('Error adding publisher');
        });
    }

    handleAuthorAddition(authorInfo) {
        this.database.addAuthor(authorInfo)
        .then((res) => {
            this.socket.emit('authorAdded', res);
        })
        .catch((err) => {
            console.log('Error adding author');
        });
    }

    handleGenreAddition(genreInfo) {
        this.database.addGenre(genreInfo)
        .then((res) => {
            this.socket.emit('genreAdded', res);
        })
        .catch((err) => {
            console.log('Error adding genre');
        });
    }

    handleBookAddition(bookInfo) {
        this.database.addBook(bookInfo)
        .then((res) => {
            //this.socket.emit('bookAdded', res);
        })
        .catch((err) => {
            console.log('Error adding book');
        });
    }

    handlePublisherRequest() {
        this.database.retrievePublishers()
        .then((publishers) => {
            this.socket.emit('publishers', publishers);
        })
        .catch((err) => {
            console.log('Error retrieving publishers');
        });
    }

    handleAuthorRequest() {
        this.database.retrieveAuthors()
        .then((authors) => {
            this.socket.emit('authors', authors);
        })
        .catch((err) => {
            console.log('Error retrieving authors');
        });
    }

    handleGenreRequest() {
        this.database.retrieveGenres()
        .then((genres) => {
            this.socket.emit('genres', genres);
        })
        .catch((err) => {
            console.log('Error retrieving genres');
        });
    }
};

function init(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = init;