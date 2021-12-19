import React from 'react'

import BookBrowser from '../Components/BookBrowser';
import AddBook from '../Components/AddBook';

class OwnerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: {
                opened: false,
                type: null
            }
        };
    }

    componentDidMount() {

    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    addBook(event) {
        this.setState({
            modal: {
                opened: true,
                type: 'addBook'
            }
        });
    }

    clearModal() {
        this.setState({
            modal: {
                opened: false,
                type: null
            }
        });
    }
    
    render() {
        if(this.state.modal.opened) {
            if(this.state.modal.type === 'addBook') {
                return(
                    <AddBook    socket={this.props.socket}
                                goToDashboard={this.clearModal.bind(this)}/>
                )
            }
        }

        return(
            this.props.admin ? (
                <div>
                    <h2>Owner Dashboard</h2>
                    <div>
                        <button onClick={this.addBook.bind(this)}>Add Book</button>
                        <button onClick={this.props.logout}>Logout</button>
                    </div>
                    <BookBrowser socket={this.props.socket}/>
                </div>
            ) : (
                <h1>You shouldn't be here...</h1>
            )
        );
    }
}

export default OwnerDashboard;