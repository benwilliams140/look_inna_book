import React from 'react'

class BookInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {
                isbn: null,
                title: '',
                description: '',
                authors: [],
                publisher: '',
                count: 0,
                price: 0.0,
                genres: []
            }
        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    close(event) {
        event.preventDefault(); // stop the default behaviour, useful to stop auto refresh
        this.props.goToBrowser(); // go back to book browser
    }

    componentDidMount() {
        this.props.socket.on('bookInfo', (book) => this.handleBookInfo(book))

        this.props.socket.emit('retrieveBookInfo', this.props.isbn);
    }

    handleBookInfo(book) {
        this.setState({ book: book });
    }

    render() {
        return (
            <div>
                <h4>{this.state.book.title}</h4>
                <p>Written By: {this.state.book.authors}</p>
                <p>Published By: {this.state.book.publisher}</p>
                <p>Description: {this.state.book.description}</p>
                <p>Genres: {this.state.book.genres}</p>
                <p>ISBN: {this.state.book.isbn}</p>
                <p>Price: ${this.state.book.price}</p>
                {
                    // userID is only sent when rendering from CustomerDashboard
                    this.props.addToCart ?   
                    <button onClick={this.props.addToCart}>Add to Cart</button> :
                    <span></span>
                }
                <button onClick={this.close.bind(this)}>Close</button>        
            </div>
        )
    }
}

export default BookInfo;