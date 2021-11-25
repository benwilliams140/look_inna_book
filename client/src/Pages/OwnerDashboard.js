import { Link, Redirect } from 'react-router-dom' // eslint-disable-line
import React from 'react'

import Login from '../Components/Login'

class OwnerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: window.localStorage.getItem('userID') || null
        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    setUser(user) {
        this.setState({userID: user.id}, () => {
            window.localStorage.setItem('userID', user.id);
        });
    }
    
    render() {
        return(
            this.state.userID ? (
                <div>
                    <h3>OwnerDashboard</h3>
                </div>
            ) : (
                <Login socket={this.props.socket} setUser={this.setUser.bind(this)}/>
            )
        )
    }
}

export default OwnerDashboard;