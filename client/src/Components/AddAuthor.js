import React from 'react'

class AddAuthor extends React.Component {
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
                Add Author
            </div>
        )
    }
}

export default AddAuthor;