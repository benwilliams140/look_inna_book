// eslint-disable-next-line
import React from 'react'

import BookBrowser from '../Components/BookBrowser';
import AccountInfo from '../Components/AccountInfo';

class CustomerDashboard extends React.Component {
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

    viewAccount(event) {
        this.setState({
            modal: {
                opened: true,
                type: 'account'
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
            if(this.state.modal.type === 'account') {
                return(
                    <AccountInfo    socket={this.props.socket}
                                    goToDashboard={this.clearModal.bind(this)}/>
                )
            }
        }
        // render the customer dashboard
        return(
            <div>
                <h1>CustomerDashboard</h1>
                <div>
                    {(this.props.user.id) ? (
                        <div>
                            <div>
                            <h4>Welcome {this.props.user.name}!</h4>
                            </div>
                            <div>
                                <button onClick={this.viewAccount.bind(this)}>View Account</button>
                                <button onClick={this.props.logout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button onClick={this.props.login}>Login</button>
                            <button onClick={this.props.register}>Register</button>
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