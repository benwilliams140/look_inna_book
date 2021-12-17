import React from 'react'

class AddGenre extends React.Component {
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
                Add Genre
            </div>
        )
    }
}

export default AddGenre;