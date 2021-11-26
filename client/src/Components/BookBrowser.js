import React from 'react'

class BookBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterBy: {
                author: null,
                isbn: null,
                bookTitle: null,
                searchKey: null
            },
            books: []
        };
    }

    componentDidMount() {
        this.props.socket.on('books', (books) => {
            this.setState({books: books});
        });

        this.retrieveBooks(); // retrieves all books (ie. no filters)
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    retrieveBooks() {
        this.props.socket.emit('retrieveBooks', this.state.filterBy);
    }

    renderBooks() {
        return this.state.books.map((book, index) => {
            return(
                <tr key={book.isbn}>
                    <td>{book.isbn}</td>
                    <td>{book.name}</td>
                    <td>{book.authors}</td>
                    <td>{book.price}</td>
                </tr>
            );
        });
    }

    render() {
        return(
        <div>
            <form>
                <h3>Book Browser</h3>
                <input id='searchKey' onChange={this.handleChange.bind(this)}/>
                <button onClick={this.retrieveBooks.bind(this)}>Search</button>
            </form>
            <div>
                <table>
                    <thead>

                    </thead>
                    <tbody>
                        {this.renderBooks()}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
};

export default BookBrowser;