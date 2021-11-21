// eslint-disable-next-line
import { Link, Redirect } from 'react-router-dom'
import React from 'react'

class CustomerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.props.socket.on('message', (message) => {
            this.state.message = message; // eslint-disable-line
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }
    
    sendMessage = (event) => {
        event.preventDefault(); // prevents refreshing after button click
        this.props.socket.emit('message', 'It works!');
    }

    render() {
        return(
            <div>
                <h3>CustomerDashboard</h3>
                <p>Message: {this.state.message}</p>
                <button onClick = {this.sendMessage.bind(this)}>Send Message</button>
            </div>
        )
    }
}

export default CustomerDashboard;