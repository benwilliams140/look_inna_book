import React from 'react'

class BookBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterBy: {
                author: false,
                isbn: false,
                bookName: true,
                searchKey: ''
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
        // set the nested attributes in state.filterBy
        this.setState({filterBy: {...this.state.filterBy, 
                                [event.target.id]: event.target.value}},
                        this.retrieveBooks);
    }

    retrieveBooks(event) {
        this.props.socket.emit('retrieveBooks', this.state.filterBy);
    }

    viewBook(event) {
        console.log(event.target.innerText);
    }

    renderBooks() {
        // map each element in the books array to a table row
        return Object.keys(this.state.books).map((isbn, index) => {
            return(
                <tr key={isbn}>
                    <td onClick={this.viewBook.bind(this)} style={{cursor:'pointer',color:'blue',textDecoration:'underline'}}>
                        {isbn}
                    </td>
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