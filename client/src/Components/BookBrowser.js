import React from 'react'

class BookBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            /*filterBy: {
                author: false,
                isbn: false,
                bookName: true,
                searchKey: ''
            },*/
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
        this.setState({[event.target.id]: event.target.value},
            this.retrieveBooks);
    }

    retrieveBooks(event) {
        this.props.socket.emit('retrieveBooks', this.state.searchKey);
    }

    renderBooks() {
        return Object.keys(this.state.books).map((isbn, index) => {
            return(
                <tr key={isbn}>
                    <td>{isbn}</td>
                    <td>{this.state.books[isbn].name}</td>
                    <td>{this.state.books[isbn].authors}</td>
                    <td>{this.state.books[isbn].price}</td>
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