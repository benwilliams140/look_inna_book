// eslint-disable-next-line
import { Link, Redirect } from 'react-router-dom'
import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            regErr: null
        };
    }

    componentDidMount() {
        this.props.socket.on('registrationResult', (res) => {
            if(res.err) {
                this.setState({regErr: res.err});
            }

            this.props.setUser(res.user);
        });
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    register(event) {
        event.preventDefault();

        const accountInfo = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
        }

        this.props.socket.emit('registerAccount', accountInfo);
    }
    
    render() {
        return(
            <div>
                <h1>Register</h1>
                <form>
                    <div>
                        <label for='firstName'>First Name</label>
                        <input id='firstName' onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label for='lastName'>Last Name</label>
                        <input id='lastName' onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label for='username'>Username</label>
                        <input id='username' onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label for='password'>Password</label>
                        <input id='password' onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label for='email'>E-Mail</label>
                        <input id='email' onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label for='phoneNumber'>Phone Number</label>
                        <input id='phoneNumber' onChange={this.handleChange.bind(this)}/>
                    </div>
                    <button onClick={this.register.bind(this)}>Register</button>
                </form>
            </div>
        )
    }
}

export default Register;