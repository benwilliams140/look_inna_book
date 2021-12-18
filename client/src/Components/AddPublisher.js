import React from 'react'

class AddPublisher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone_number: null,
            postal_code: '',
            city: '',
            street_name: '',
            street_number: 1,
            province: ''
        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    componentDidMount() {
        this.props.socket.on('locationAdded', () => this.addPublisher());
        this.props.socket.on('publisherAdded', (publisher) => this.props.addAndSelectPublisher(publisher));
    }

    submit(event) {
        event.preventDefault();
        this.addLocation();
    }

    addPublisher() {
        this.props.socket.emit('addPublisher', this.state);
    }

    addLocation() {
        let locationInfo = {
            postal_code: this.state.postal_code,
            city: this.state.city,
            province: this.state.province,
            street_number: this.state.street_number,
            street_name: this.state.street_name
        };

        this.props.socket.emit('addLocation', locationInfo);
    }

    render() {
        return (
            <div>
                <label htmlFor='name'>Name: </label>
                <input id='name' onChange={this.handleChange.bind(this)} required/>
                <br/>
                <label htmlFor='email'>Email: </label>
                <input id='email' onChange={this.handleChange.bind(this)} required/>
                <br/>
                <label htmlFor='phone_number'>Phone Number: </label>
                <input type="tel" id="phone_number" placeholder="1234567890" pattern="[0-9]{10}" onChange={this.handleChange.bind(this)}/>
                <br/>
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
                <select id="province" onChange={this.handleChange.bind(this)}>
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
                <br/>
                <button onClick={this.submit.bind(this)}>Submit</button>
            </div>
        )
    }
}

export default AddPublisher;