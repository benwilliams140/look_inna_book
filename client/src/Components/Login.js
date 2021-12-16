// eslint-disable-next-line
import { Link, Redirect } from 'react-router-dom'
import React from 'react'

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

    // setup socket event handling
    componentDidMount() {
        this.props.socket.on('user', (user) => {
            this.props.setUser(user);
        });
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    login(event) {
        event.preventDefault();
        
        const credentials = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.socket.emit('accountLogin', credentials);
    }

    cancel(event) {
        event.preventDefault(); // stop the default behaviour, useful to stop auto refresh
        this.props.goToDashboard(); // go back to main dashboard
    }
    
    render() {
        return(
            <div>
                <h3>Login</h3>
                <div>
                    <form action = ''>
                        <div>
                            <label htmlFor='username'>Username</label>
                            <input id='username' onChange = { this.handleChange.bind(this) }></input>
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input id='password' onChange = { this.handleChange.bind(this) }></input>
                        </div>
                        <div>
                            <button onClick = { this.login.bind(this) }>Login</button>
                            <button onClick={this.cancel.bind(this)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;