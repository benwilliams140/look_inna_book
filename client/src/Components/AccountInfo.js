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

    close(event) {
        event.preventDefault(); // stop the default behaviour, useful to stop auto refresh
        this.props.goToDashboard(); // go back to main dashboard
    }

    deleteAccount(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                Account Info
                <button onClick={this.close.bind(this)}>Close</button>
            </div>
        )
    }
}

export default AccountInfo;