import React from 'react'

import Login from '../Components/Login'
import Register from '../Components/Register'
import CustomerDashboard from './CustomerDashboard'
import OwnerDashboard from './OwnerDashboard'


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(window.localStorage.getItem('user')) || {},
            modal: {
                opened: false,
                type: null
            }
        };
    }

    componentDidMount() {
        
    }

    logout() {
        window.localStorage.clear();
        window.sessionStorage.clear();
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
        });
    }

    setUser(user) {
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
                window.localStorage.setItem('user', JSON.stringify(user_));
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

        // navigate to the admin dashboard if they login, currently not very secure
        if(this.state.user && this.state.user.id === 1 && this.state.user.username === 'admin') {
            return <OwnerDashboard  socket={this.props.socket}
                                    admin={this.state.user}
                                    logout={this.logout.bind(this)}/>
        }

        // render the customer dashboard
        return(
            <CustomerDashboard  socket={this.props.socket}
                                user={this.state.user}
                                login={this.login.bind(this)}
                                logout={this.logout.bind(this)}
                                register={this.register.bind(this)}/>
        );
    }
}

export default Dashboard;