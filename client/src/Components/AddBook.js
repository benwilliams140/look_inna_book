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
            selectedPublisher: '',
            genres: [],
            selectedGenre: '',
            authors: [],
            selectedAuthor: ''
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

    addPublisher(publisher) {
        let list = this.state.publishers;
        list.push(publisher);
        this.setState({
            publishers: list,
            selectedPublisher: publisher.id
        });
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

    // submits the form, adding all necessary components to the database
    submit(event) {
        if(event.bubbles) return;

        if(this.state.selectedPublisher === 'new' ||
            this.state.selectedAuthor === 'new' ||
            this.state.selectedGenre === 'new') {
                return;
        }

        let bookInfo = {
            isbn: this.state.isbn,
            title: this.state.title,
            description: this.state.description,
            num_pages: this.state.num_pages,
            price: this.state.price,
            count: this.state.count,
            percentage_of_sales: this.state.percentage_of_sales,
            publisher_id: this.state.selectedPublisher.publisher_id,
            author_ids: [
                this.state.selectedAuthor.author_id
            ],
            genre_ids: [
                this.state.selectedGenre.genre_id
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
                        <input type='number' placeholder='1000000000' min='1000000000' max='9999999999' id='isbn' onChange={this.handleChange.bind(this)} required/>
                        <br/>
                        <label htmlFor='title'>Title: </label>
                        <input id='title' onChange={this.handleChange.bind(this)} required/>
                        <br/>
                        <label htmlFor='description'>Description: </label> 
                        <input id='description' onChange={this.handleChange.bind(this)} required/>
                        <br/>
                        <label htmlFor='num_pages'>Number of Pages: </label>
                        <input id='num_pages' onChange={this.handleChange.bind(this)} type='number' min='1' placeholder='1' required/>
                        <br/>
                        <label htmlFor='price'>Price: </label>
                        <input id='price' onChange={this.handleChange.bind(this)} type='number' step='0.01' placeholder='0.0' min='0.0' required/>
                        <br/>
                        <label htmlFor='count'>Stock Count: </label>
                        <input id='count' onChange={this.handleChange.bind(this)} type='number' min='1' placeholder='1' required/>
                        <br/>
                        <label htmlFor='percentage_of_sales'>Percentage of Sales: </label>
                        <input id='percentage_of_sales' onChange={this.handleChange.bind(this)} type='number' step='0.001' placeholder='0.0' min='0.0' max='1.0' required/>
                    </div>
                    <div>
                        <h4>Publisher Information</h4>
                        <select id='selectedPublisher' value={this.state.selectedPublisher} onChange={this.handleChange.bind(this)} required>
                            <option key='' value=''>Select a Publisher</option>
                            {this.renderPublishers()}
                            <option key='new' value='new'>+ New Publisher</option>
                        </select>
                        {
                            this.state.selectedPublisher === 'new' ?
                            <AddPublisher   socket={this.props.socket}
                                            addAndSelectPublisher={this.addPublisher.bind(this)}/> :
                            <span></span>
                        }
                    </div>
                    <div>
                        <h4>Author Information</h4>
                        <select id='selectedAuthor' value={this.state.selectedAuthor} onChange={this.handleChange.bind(this)} required>
                            <option key='' value=''>Select an Author</option>
                            {this.renderAuthors()}
                            <option key='new' value='new'>+ New Author</option>
                        </select>
                        {
                            this.state.selectedAuthor === 'new' ?
                            <AddAuthor  socket={this.props.socket}/> :
                            <span></span>
                        }
                    </div>
                    <div>
                        <h4>Genre Information</h4>
                        <select id='selectedGenre' value={this.state.selectedGenre} onChange={this.handleChange.bind(this)} required>
                            <option key='' value=''>Select a Genre</option>
                            {this.renderGenres()}
                            <option key='new' value='new'>+ New Genre</option>
                        </select>
                        {
                            this.state.selectedGenre === 'new' ?
                            <AddGenre   socket={this.props.socket}/> :
                            <span></span>
                        }
                    </div>
                    <br/>
                    <button onClick={this.submit.bind(this)}>Submit</button>
                    <button onClick={this.cancel.bind(this)}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default AddBook;