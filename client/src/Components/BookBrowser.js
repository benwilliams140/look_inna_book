import React from 'react'

import BookInfo from './BookInfo';

class BookBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterBy: {
                author: false,
                isbn: false,
                bookName: true,
                genre: false,
                searchKey: ''
            },
            bookModal: {
                opened: false,
                isbn: null
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

    handleCheckboxChange(event) {
        // set the nested attributes in state.filterBy
        this.setState({filterBy: {...this.state.filterBy, 
                                [event.target.id]: event.target.checked}},
                        this.retrieveBooks);
    }

    retrieveBooks(event) {
        this.props.socket.emit('retrieveBooks', this.state.filterBy);
    }

    viewBook(event) {
        console.log();
        this.setState({
            bookModal: {
                opened: true,
                isbn: event.target.innerText
            }
        });
    }

    clearModal() {
        this.setState({
            bookModal: {
                opened: false,
                isbn: null
            }
        });
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
                    <td>{this.state.books[isbn].genres}</td>
                </tr>
            );
        });
    }

    render() {
        return(
        <div>
            <h3>Book Browser</h3>
            
            {this.state.bookModal.opened && this.state.bookModal.isbn ? (
                <div>
                    <BookInfo   socket={this.props.socket}
                                isbn={this.state.bookModal.isbn}
                                goToBrowser={this.clearModal.bind(this)}
                                addToBasket={this.props.addToBasket}/>
                </div>
            ) : (
                <div>
                    <form>
                        <input type='search' id='searchKey' onChange={this.handleChange.bind(this)}/>
                        <button onClick={this.retrieveBooks.bind(this)}>Search</button>
                        <br/>
                        <label htmlFor='searchByAtt'>Search By:</label>
                        <span id='searchByAtt'>
                            <input id='bookName' type='checkbox' onChange={this.handleCheckboxChange.bind(this)} checked={this.state.filterBy.bookName}/>
                            <label htmlFor='bookName'>Book Name</label>
                            <input id='author' type='checkbox' onChange={this.handleCheckboxChange.bind(this)} checked={this.state.filterBy.author}/>
                            <label htmlFor='author'>Author</label>
                            <input id='isbn' type='checkbox' onChange={this.handleCheckboxChange.bind(this)} checked={this.state.filterBy.isbn}/>
                            <label htmlFor='isbn'>ISBN</label>
                            <input id='genre' type='checkbox' onChange={this.handleCheckboxChange.bind(this)} checked={this.state.filterBy.genre}/>
                            <label htmlFor='genre'>Genre</label>
                        </span>
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
            )}
        </div>
        );
    }
};

export default BookBrowser;