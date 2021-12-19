// eslint-disable-next-line
import { Link, Redirect } from 'react-router-dom'
import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            email: '',
            phone_number: '',
            postal_code: '',
            city: '',
            street_name: '',
            street_number: 1,
            province: '',
            card_number: null,
            card_type: '',
            csv: null,
            expiry: ''
        };
    }

    componentDidMount() {
        this.props.socket.on('registrationResult', (user) => {
            this.props.setUser(user);
        });
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    register(event) {
        event.preventDefault(); // stop the default behaviour, useful to stop auto refresh

        this.props.socket.emit('registerAccount', this.state);
    }

    cancel(event) {
        event.preventDefault(); // stop the default behaviour, useful to stop auto refresh
        this.props.goToDashboard(); // go back to main dashboard
    }
    
    render() {
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit={this.register.bind(this)}>
                    <div>
                        <label htmlFor='first_name'>First Name</label>
                        <input id='first_name' onChange={this.handleChange.bind(this)} required/>
                    </div>
                    <div>
                        <label htmlFor='last_name'>Last Name</label>
                        <input id='last_name' onChange={this.handleChange.bind(this)} required/>
                    </div>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input id='username' onChange={this.handleChange.bind(this)} required/>
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input id='password' onChange={this.handleChange.bind(this)} required/>
                    </div>
                    <div>
                        <label htmlFor='email'>E-Mail</label>
                        <input id='email' onChange={this.handleChange.bind(this)} required/>
                    </div>
                    <div>
                        <label htmlFor='phone_number'>Phone Number: </label>
                        <input type="tel" id="phone_number" placeholder="1234567890" pattern="[0-9]{10}" onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div>
                        <label htmlFor='street_number'>Street Address: </label>
                        <input id='street_number' type='number' min='1' placeholder='1' onChange={this.handleChange.bind(this)} required/>
                        <input id='street_name' placeholder='Database Lane' onChange={this.handleChange.bind(this)} required/>
                        <br/>
                        <label htmlFor='postal_code'>Postal Code: </label>
                        <input id="postal_code" placeholder="A1B2C3" pattern="[A-Z][0-9][A-Z][0-9][A-Z][0-9]" onChange={this.handleChange.bind(this)} required/>
                        <br/>
                        <label htmlFor='city'>City: </label>
                        <input id='city' onChange={this.handleChange.bind(this)} required/>
                        <br/>
                        <label htmlFor='province'>Province: </label>
                        <select id="province" onChange={this.handleChange.bind(this)} required>
                            <option value=''>Select a Province</option>
                            <option value="AB">Alberta</option>
                            <option value="BC">British Columbia</option>
                            <option value="MB">Manitoba</option>
                            <option value="NB">New Brunswick</option>
                            <option value="NL">Newfoundland and Labrador</option>
                            <option value="NS">Nova Scotia</option>
                            <option value="NT">Northwest Territories</option>
                            <option value="NU">Nunavut</option>
                            <option value="ON">Ontario</option>
                            <option value="PE">Prince Edward Island</option>
                            <option value="QC">Quebec</option>
                            <option value="SK">Saskatchewan</option>
                            <option value="YT">Yukon</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='card_number'>Card Nuber: </label>
                        <input id='card_number' pattern='[0-9]{16}' placeholder='0000111122223333' onChange={this.handleChange.bind(this)} required/>
                        <br/>
                        <label htmlFor='csv'>CSV: </label>
                        <input id='csv' style={{width:'30px'}} pattern='[0-9]{3}' placeholder='123' onChange={this.handleChange.bind(this)} required/>
                        <label htmlFor='expiry'>Expiry: </label>
                        <input id='expiry' style={{width:'40px'}} pattern='[0-1][0-9]{3}' placeholder='MMYY' onChange={this.handleChange.bind(this)} required/>
                        <select id='card_type' onChange={this.handleChange.bind(this)} required>
                            <option value=''>Card Type</option>
                            <option value='VISA'>VISA</option>
                            <option value='AMEX'>AMEX</option>
                            <option value='MasterCard'>MasterCard</option>
                        </select>
                    </div>
                    <button type='submit'>Register</button>
                    <button onClick={this.cancel.bind(this)}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default Register;