import React from 'react'

class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    componentDidMount() {

    }

    retrieveUserInfo() {

    }

    deleteAccount(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                Account Info
                <button onClick={this.props.goToDashboard}>Close</button>
            </div>
        )
    }
}

export default AccountInfo;