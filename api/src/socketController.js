const Database = require('./databaseController');

class Connection {
    constructor(io, socket) {
        this.socket = socket;
        this.io = io;
        this.database = new Database();

        socket.on('registerAccount', (info) => this.handleAccountRegistration(info));
        socket.on('accountLogin', (credentials) => this.handleAccountLogin(credentials));
        socket.on('retrieveBooks', (filter) => this.handleBookSearch(filter));
        socket.on('retrieveBookInfo', (isbn) => this.handleBookRequest(isbn));
        socket.on('retrievePublishers', () => this.handlePublisherRequest());
        socket.on('retrieveAuthors', () => this.handleAuthorRequest());
        socket.on('retrieveGenres', () => this.handleGenreRequest());
        socket.on('retrieveBasket', (id) => this.handleBasketRequest(id));
        socket.on('findBasket', (userID) => this.handleBasketSearch(userID));
        socket.on('removeBasket', (id) => this.handleBasketDeletion(id));
        socket.on('addLocation', (locationInfo) => this.handleLocationAddition(locationInfo));
        socket.on('addPublisher', (publisherInfo) => this.handlePublisherAddition(publisherInfo));
        socket.on('addAuthor', (authorInfo) => this.handleAuthorAddition(authorInfo));
        socket.on('addGenre', (genreInfo) => this.handleGenreAddition(genreInfo));
        socket.on('addBook', (bookInfo) => this.handleBookAddition(bookInfo));
        socket.on('addToBasket', (basket, item) => this.handleBasketAddition(basket, item));
        socket.on('removeFromBasket', (id, isbn) => this.handleRemoveFromBasket(id, isbn));
        socket.on('updateBasketCount', (basketID, item) => this.handleBasketCountUpdate(basketID, item));

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
            console.log(err);
        });
    }

    handleBookSearch(filter) {
        this.database.searchForBooks(filter)
        .then((books) => {
            this.socket.emit('books', books);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleBookRequest(isbn) {
        this.database.retrieveBookInfo(isbn)
        .then((book) => {
            this.socket.emit('bookInfo', book);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleLocationAddition(locationInfo) {
        this.database.addLocation(locationInfo)
        .then(() => {
            this.socket.emit('locationAdded');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handlePublisherAddition(publisherInfo) {
        this.database.addPublisher(publisherInfo)
        .then((res) => {
            this.socket.emit('publisherAdded', res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleAuthorAddition(authorInfo) {
        this.database.addAuthor(authorInfo)
        .then((res) => {
            this.socket.emit('authorAdded', res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleGenreAddition(genreInfo) {
        this.database.addGenre(genreInfo)
        .then((res) => {
            this.socket.emit('genreAdded', res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleBookAddition(bookInfo) {
        this.database.addBook(bookInfo)
        .then((res) => {
            //this.socket.emit('bookAdded', res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handlePublisherRequest() {
        this.database.retrievePublishers()
        .then((publishers) => {
            this.socket.emit('publishers', publishers);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleAuthorRequest() {
        this.database.retrieveAuthors()
        .then((authors) => {
            this.socket.emit('authors', authors);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleGenreRequest() {
        this.database.retrieveGenres()
        .then((genres) => {
            this.socket.emit('genres', genres);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    async handleBasketAddition(basket, item) {
        // create a basket if one isn't stored
        if(!basket.id) {
            basket = await this.database.createBasket(basket.user);
        }

        // add book to the basket
        this.database.addToBasket(basket, item)
        .then((item) => {
            this.socket.emit('itemAdded', basket, item);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleRemoveFromBasket(id, isbn) {
        this.database.removeFromBasket(id, isbn)
        .then((item) => {
            
        })
        .catch((err) => {
            console.log(err);
        })
    }

    handleBasketRequest(id) {
        this.database.retrieveBasket(id)
        .then((basket) => {
            this.socket.emit('basketContents', basket);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleBasketSearch(userID) {
        this.database.findBasketID(userID)
        .then((id) => {
            this.socket.emit('basketID', id);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleBasketDeletion(id) {
        this.database.deleteBasket(id)
        .then((res) => {
            
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handleBasketCountUpdate(basketID, item) {
        this.database.updateBasket(basketID, item)
        .then((res) => {

        })
        .catch((err) => {
            console.log(err);
        });
    }
};

function init(io) {
    io.on('connection', (socket) => {
        new Connection(io, socket);
    });
}

module.exports = init;