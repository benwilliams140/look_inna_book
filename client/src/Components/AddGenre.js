import React from 'react'

class AddGenre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    componentDidMount() {

    }

    submit() {
        this.props.socket.emit('addGenre', this.state);
    }

    render() {
        return (
            <div>
                <label htmlFor='name'>Name: </label>
                <input id='name' onChange={this.handleChange.bind(this)} required/>
                <br/>
                <label htmlFor='description'>Description: </label>
                <input id='description' onChange={this.handleChange.bind(this)} required/>
                <br/>
                <button onClick={this.submit.bind(this)}>Submit</button>                
            </div>
        )
    }
}

export default AddGenre;