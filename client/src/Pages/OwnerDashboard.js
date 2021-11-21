// eslint-disable-next-line
import { Link, Redirect } from 'react-router-dom'
import React from 'react'

class OwnerDashboard extends React.Component {
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
                <h3>OwnerDashboard</h3>
            </div>
        )
    }
}

export default OwnerDashboard;