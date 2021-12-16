// eslint-disable-next-line
import React from 'react'

import BookBrowser from '../Components/BookBrowser';

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

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    clearModal() {
        this.setState({
            modal: {
                opened: false,
                type: null
            }
        })
    }

    render() {
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