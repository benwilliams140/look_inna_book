import React from 'react'

class BookInfo extends React.Component {
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
                Book Info               
            </div>
        )
    }
}

export default BookInfo;