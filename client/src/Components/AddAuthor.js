import React from 'react'

class AddAuthor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone_number: null
        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    componentDidMount() {

    }

    submit() {
        this.props.socket.emit('addAuthor', this.state);
    }

    render() {
        return (
            <div>
                <label htmlFor='first_name'>First Name: </label>
                <input id='first_name' onChange={this.handleChange.bind(this)} required/>
                <br/>
                <label htmlFor='last_name'>Last Name: </label>
                <input id='last_name' onChange={this.handleChange.bind(this)} required/>
                <br/>
                <label htmlFor='email'>Email: </label>
                <input id='email' onChange={this.handleChange.bind(this)} required/>
                <br/>
                <label htmlFor='phone_number'>Phone Number: </label>
                <input type="tel" id="phone_number" placeholder="1234567890" pattern="[0-9]{10}" onChange={this.handleChange.bind(this)}/>
                <br/>
                <button onClick={this.submit.bind(this)}>Submit</button>
            </div>
        )
    }
}

export default AddAuthor;