// eslint-disable-next-line
import { Link, Redirect } from 'react-router-dom'
import React from 'react'

class CustomerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }
    
    render() {
        return(
            <div>
                <h3>CustomerDashboard</h3>
            </div>
        )
    }
}

export default CustomerDashboard;