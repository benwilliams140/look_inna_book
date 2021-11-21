// eslint-disable-next-line
import { Link, Redirect } from 'react-router-dom'
import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }

    register = async() => {
        const req = {
            method: 'POST',
            headers: { 'Content-Type': 'text/html'},
            body: JSON.stringify({
                
            })
        };

        await fetch('/register', req)
        .then((res) => {
            console.log(JSON.parse(res));
        })
    }
    
    render() {
        return(
            <div>
                <h3>Register</h3>
            </div>
        )
    }
}

export default Register;