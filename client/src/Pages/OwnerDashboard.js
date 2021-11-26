import { Link, Redirect } from 'react-router-dom' // eslint-disable-line
import React from 'react'

import Login from '../Components/Login'
import BookBrowser from '../Components/BookBrowser';

class OwnerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: window.localStorage.getItem('userID') || null // retrieve from window storage, default to null
        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    logout() {
        window.localStorage.clear();
        this.setState({userID: null});
    }

    setUser(user) {
        if(user) {
            if(user.username !== 'admin' || user.id !== 1) return; // verify that the admin is logged in
            
            // set the react component state, followed by adding the item to the window storage
            this.setState({userID: user.id}, () => {
                window.localStorage.setItem('userID', user.id);
            });
        }
    }
    
    render() {
        return(
            this.state.userID ? (
                <div>
                    <h1>OwnerDashboard</h1>
                    <button onClick={this.logout.bind(this)}>Logout</button>
                    <BookBrowser socket={this.props.socket}/>
                </div>
            ) : (
                <Login socket={this.props.socket} setUser={this.setUser.bind(this)}/>
            )
        );
    }
}

export default OwnerDashboard;