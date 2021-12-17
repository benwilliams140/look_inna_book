import React from 'react'

class AddPublisher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                Add Publisher
            </div>
        )
    }
}

export default AddPublisher;