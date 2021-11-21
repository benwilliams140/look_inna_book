// eslint-disable-next-line
import { Link, Redirect } from 'react-router-dom'
import React from 'react'
import * as Helper from '../Helper'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            response: ''
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    login = async(event) => {
        event.preventDefault();

        const req = {
            method: 'POST',
            headers: { 'Content-Type': 'text/html'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        };

        await fetch(Helper.getURL('login'), req)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ response: res.loggedIn.toString() });
        });
    }
    
    render() {
        return(
            <div>
                <h3>Login</h3>
                <div>
                    <form action = ''>
                        <div>
                            <label for='username'>Username</label>
                            <input id='username' onChange = { this.handleChange.bind(this) }></input>
                        </div>
                        <div>
                            <label for='password'>Password</label>
                            <input id='password' onChange = { this.handleChange.bind(this) }></input>
                        </div>
                        <div>
                            <button onClick = { this.login.bind(this) }>Login</button>
                        </div>
                    </form>
                </div>
                <div>
                    <p>Logged In: {this.state.response}</p>
                </div>
            </div>
        )
    }
}

export default Login;