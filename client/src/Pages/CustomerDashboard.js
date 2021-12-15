// eslint-disable-next-line
import React from 'react'
import { Navigate } from 'react-router-dom'

import Login from '../Components/Login'
import Register from '../Components/Register'
import BookBrowser from '../Components/BookBrowser';

class CustomerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: window.localStorage.getItem("user") || {},
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
        this.setState({user: {}});
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

    clearModal() {
        this.setState({
            modal: {
                opened: false,
                type: null
            }
        })
    }

    setUser(user) {
        console.log(user);
        if(user) {
            // retrieve and calculate values in the right format
            let user_ = {
                id: user.id,
                name: user.first_name + ' ' + user.last_name,
                username: user.username
            };

            // set the react component state, followed by adding the item to the window storage
            // stores states to render on the website
            this.setState({
                user: user_,
                modal: {
                    opened: false,
                    type: null
                }
            }, () => {
                window.localStorage.setItem('user', user_);
            });
        }
    }

    render() {
        // render the login or register component
        if(this.state.modal.opened) {
            if(this.state.modal.type === 'login') {
                return (
                    <Login  socket={this.props.socket}
                            setUser={this.setUser.bind(this)}
                            goToDashboard={this.clearModal.bind(this)}/>
                );
            } else if(this.state.modal.type === 'register') {
                return (
                    <Register   socket={this.props.socket}
                                setUser={this.setUser.bind(this)}
                                goToDashboard={this.clearModal.bind(this)}/>
                )
            }
        }

        // navigate to the admin dashboard if they login
        if(this.state.user && this.state.user.id === 1 && this.state.user.username === 'admin') {
            return <Navigate to='/admin'/>
        }

        // render the customer dashboard
        return(
            <div>
                <h1>CustomerDashboard</h1>
                <div>
                    {(this.state.user.id) ? (
                        <div>
                            <div>
                            <h4>Welcome {this.state.user.name}!</h4>
                            </div>
                            <div>
                                <button onClick={this.logout.bind(this)}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button onClick={this.login.bind(this)}>Login</button>
                            <button onClick={this.register.bind(this)}>Register</button>
                        </div>
                    )}
                </div>
                <div>
                    <BookBrowser socket={this.props.socket}/>
                </div>
            </div>
        );
    }
}

export default CustomerDashboard;