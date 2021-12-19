import React from 'react'

class BookInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {
                isbn: null,
                title: '',
                description: '',
                num_pages: 1,
                authors: [],
                publisher: '',
                count: 0,
                price: 0.0,
                genres: []
            },
            orderCount: 1
        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    componentDidMount() {
        this.props.socket.on('bookInfo', (book) => this.handleBookInfo(book))

        this.props.socket.emit('retrieveBookInfo', this.props.isbn);
    }

    handleBookInfo(book) {
        this.setState({ book: book });
    }

    addToBasket(event) {
        this.props.addToBasket(this.state.book.isbn, this.state.orderCount);
    }

    render() {
        return (
            <div>
                <h4>{this.state.book.title}</h4>
                <p>Written By: {this.state.book.authors}</p>
                <p>Published By: {this.state.book.publisher}</p>
                <p>Description: {this.state.book.description}</p>
                <p>Number of Pages: {this.state.book.num_pages}</p>
                <p>Genres: {this.state.book.genres}</p>
                <p>ISBN: {this.state.book.isbn}</p>
                <p>Price: ${this.state.book.price}</p>
                {
                    // userID is only sent when rendering from CustomerDashboard
                    this.props.addToBasket ?
                    <div>
                        <input type='number' id='orderCount' placeholder='1' min='1' max={this.state.book.count} onChange={this.handleChange.bind(this)}/> 
                        <button onClick={this.addToBasket.bind(this)}>Add to Basket</button>
                    </div> :
                    <span></span>
                }
                <button onClick={this.props.goToBrowser}>Close</button>
            </div>
        )
    }
}

export default BookInfo;