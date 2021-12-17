import React from 'react'

/* eslint-disable */
import AddGenre from './AddGenre';
import AddAuthor from './AddAuthor';
import AddPublisher from './AddPublisher';
/* eslint-enable */

class AddBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isbn: '',
            title: '',
            description: '',
            num_pages: 1,
            price: 0.0,
            count: 0,
            percentage_of_sales: 0.0,
            publishers: [],
            selectedPublisher: null,
            genres: [],
            selectedGenre: null,
            authors: [],
            selectedAuthor: null
        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    componentDidMount() {
        this.retrievePublishers();
        this.retrieveGenres();
        this.retrieveAuthors();
    }

    retrievePublishers() {
        this.props.socket.on('publishers', (publishers) => {
            this.setState({
                publishers: publishers
            });
        });

        this.props.socket.emit('retrievePublishers');
    }

    retrieveGenres() {
        this.props.socket.on('genres', (genres) => {
            this.setState({
                genres: genres
            });
        });

        this.props.socket.emit('retrieveGenres');
    }

    retrieveAuthors() {
        this.props.socket.on('authors', (authors) => {
            this.setState({
                authors: authors
            });
        });

        this.props.socket.emit('retrieveAuthors');
    }

    cancel(event) {
        event.preventDefault(); // stop the default behaviour, useful to stop auto refresh
        this.props.goToDashboard(); // go back to main dashboard
    }

    submit(event) {
        event.preventDefault();
        
        let bookInfo = {
            isbn: this.state.isbn,
            title: this.state.title,
            description: this.state.description,
            num_pages: this.state.num_pages,
            price: this.state.price,
            count: this.state.count,
            percentage_of_sales: this.state.percentage_of_sales,
            publisher_id: this.state.selectedPublisher,
            author_ids: [
                this.state.selectedAuthor
            ],
            genre_ids: [
                this.state.selectedGenre
            ]
        }

        this.props.socket.emit('addBook', bookInfo);
    }

    renderPublishers() {
        return this.state.publishers.map((item) => {
            return(<option key={item.id} value={item.id}>{item.name}</option>)
        });
    }

    renderAuthors() {
        return this.state.authors.map((item) => {
            return(<option key={item.id} value={item.id}>{item.first_name + ' ' + item.last_name}</option>)
        });
    }

    renderGenres() {
        return this.state.genres.map((item) => {
            return(<option key={item.id} value={item.id}>{item.name}</option>)
        });
    }

    render() {
        return (
            <div>
                <h2>Add Book</h2>
                <form>
                    <div>
                        <h4>Book Information</h4>
                        <label htmlFor='isbn'>ISBN: </label>
                        <input id='isbn' onChange={this.handleChange.bind(this)}/>
                        <br/>
                        <label htmlFor='title'>Title: </label>
                        <input id='title' onChange={this.handleChange.bind(this)}/>
                        <br/>
                        <label htmlFor='description'>Description: </label>
                        <input id='description' onChange={this.handleChange.bind(this)}/>
                        <br/>
                        <label htmlFor='num_pages'>Number of Pages: </label>
                        <input id='num_pages' onChange={this.handleChange.bind(this)} type='number' min='1' placeholder='1'/>
                        <br/>
                        <label htmlFor='price'>Price: </label>
                        <input id='price' onChange={this.handleChange.bind(this)} type='number' step='0.01' placeholder='0.0' min='0.0'/>
                    </div>
                    <div>
                        <h4>Publisher Information</h4>
                        <select id='selectedPublisher' onChange={this.handleChange.bind(this)}>
                            <option key='' value=''>Select a Publisher</option>
                            {this.renderPublishers()}
                            <option key='new' value='new'>+ New Publisher</option>
                        </select>
                        {
                            this.state.selectedPublisher === 'new' ?
                            <AddPublisher socket={this.props.socket}/> :
                            <span></span>
                        }
                    </div>
                    <div>
                        <h4>Author Information</h4>
                        <select id='selectedAuthor' onChange={this.handleChange.bind(this)}>
                            <option key='' value=''>Select an Author</option>
                            {this.renderAuthors()}
                            <option key='new' value='new'>+ New Author</option>
                        </select>
                        {
                            this.state.selectedAuthor === 'new' ?
                            <AddAuthor socket={this.props.socket}/> :
                            <span></span>
                        }
                    </div>
                    <div>
                        <h4>Genre Information</h4>
                        <select id='selectedGenre' onChange={this.handleChange.bind(this)}>
                            <option key='' value=''>Select a Genre</option>
                            {this.renderGenres()}
                            <option key='new' value='new'>+ New Genre</option>
                        </select>
                        {
                            this.state.selectedGenre === 'new' ?
                            <AddGenre socket={this.props.socket}/> :
                            <span></span>
                        }
                    </div>
                </form>
                <br/>
                <button onClick={this.cancel.bind(this)}>Cancel</button>
                <button onClick={this.submit.bind(this)}>Submit</button>
            </div>
        )
    }
}

export default AddBook;