// eslint-disable-next-line
import { Link, Redirect } from 'react-router-dom'
import React from 'react'

import Login from '../Components/Login'
import Register from '../Components/Register'
import BookBrowser from '../Components/BookBrowser';

class CustomerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            modal: {
                opened: false,
                type: null
            }
        };
    }

    componentDidMount() {

    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    logout() {
        window.localStorage.clear();
        this.setState({userID: null});
    }

    login() {
        this.setState({
            modal: {
                opened: true,
                type: 'login'
            }
        });
    }

    register() {
        this.setState({
            modal: {
                opened: true,
                type: 'register'
            }
        });
    }

    setUser(user) {
        console.log(user);
        if(user) {
            // set the react component state, followed by adding the item to the window storage
            this.setState({
                userID: user.id,
                modal: {
                    opened: false,
                    type: null
                }
            }, () => {
                window.localStorage.setItem('userID', user.id);
            });
        }
    }

    render() {
        // render the login or register component
        if(this.state.modal.opened) {
            if(this.state.modal.type === 'login') {
                return (
                    <Login socket={this.props.socket} setUser={this.setUser.bind(this)}/>
                );
            } else if(this.state.modal.type === 'register') {
                return (
                    <Register socket={this.props.socket} setUser={this.setUser.bind(this)}/>
                )
            }
        }

        // render the customer dashboard
        return(
            <div>
                <h1>CustomerDashboard</h1>
                <div>
                    {(this.state.userID) ? (
                        <div>
                            <button onClick={this.logout.bind(this)}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={this.login.bind(this)}>Login</button>
                            <button onClick={this.register.bind(this)}>Register</button>
                        </div>
                    )}
                </div>
                <BookBrowser socket={this.props.socket}/>
            </div>
        );
    }
}

export default CustomerDashboard;