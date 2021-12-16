import React from 'react'

import BookBrowser from '../Components/BookBrowser';

class OwnerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }
    
    render() {
        return(
            this.props.admin ? (
                <div>
                    <h1>Owner Dashboard</h1>
                    <button onClick={this.props.logout}>Logout</button>
                    <BookBrowser socket={this.props.socket}/>
                </div>
            ) : (
                <h1>You shouldn't be here...</h1>
            )
        );
    }
}

export default OwnerDashboard;