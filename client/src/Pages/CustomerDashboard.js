// eslint-disable-next-line
import React from 'react'

import BookBrowser from '../Components/BookBrowser';
import AccountInfo from '../Components/AccountInfo';
import CheckoutBasket from '../Components/CheckoutBasket';

class CustomerDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: {
                opened: false,
                type: null
            },
            basketID: window.sessionStorage.getItem('basketID') || null
        };
    }

    componentDidMount() {
        window.onbeforeunload = (event) => {
            // delete the basket if the user isn't registered
            if(!this.props.user.id && this.state.basketID) {
                this.props.socket.emit('removeBasket', this.state.basketID);
            }
        }

        this.props.socket.on('basketID', (id) => {
            console.log(id);
            this.setState({
                basketID: id
            }, () => {
                window.sessionStorage.setItem('basketID', id);
            });
        });

        this.props.socket.on('itemAdded', (basket, item) => {
            this.setState({
                basketID: basket.id
            }, () => {
                window.sessionStorage.setItem('basketID', basket.id);
            });
        });

        if(this.props.user.id) {
            console.log('looking');
            this.props.socket.emit('findBasket', this.props.user.id);
        }
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    addToBasket(isbn, count) {
        let basket = {
            id: this.state.basketID,
            user: this.props.user.id,
        };
        let item = {
            isbn: isbn,
            count: count
        };
        this.props.socket.emit('addToBasket', basket, item)
    }

    viewAccount(event) {
        this.setState({
            modal: {
                opened: true,
                type: 'account'
            }
        });
    }

    viewBasket(event) {
        this.setState({
            modal: {
                opened: true,
                type: 'basket'
            }
        });
    }
    
    clearModal() {
        this.setState({
            modal: {
                opened: false,
                type: null
            }
        });
    }

    login() {
        // remove current basket before logging in
        if(!this.props.user.id && this.state.basketID) {
            this.props.socket.emit('removeBasket', this.state.basketID);
        }

        this.props.login();
    }

    logout() {
        this.setState({
            basketID: null
        });
        this.props.logout();
    }

    render() {
        if(this.state.modal.opened) {
            if(this.state.modal.type === 'account') {
                return(
                    <AccountInfo    socket={this.props.socket}
                                    goToDashboard={this.clearModal.bind(this)}/>
                )
            } else if(this.state.modal.type === 'basket') {
                return(
                    <CheckoutBasket socket={this.props.socket}
                                    goToDashboard={this.clearModal.bind(this)}
                                    basketID={this.state.basketID}
                                    key={1}/>
                )
            }
        }
        // render the customer dashboard
        return(
            <div>
                <h2>CustomerDashboard</h2>
                <div>
                    <button onClick={this.viewBasket.bind(this)}>View Basket</button>
                    {(this.props.user.id) ? (
                        <div>
                            <div>
                            <h4>Welcome {this.props.user.name}!</h4>
                            </div>
                            <div>
                                <button onClick={this.viewAccount.bind(this)}>View Account</button>
                                <button onClick={this.logout.bind(this)}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <button onClick={this.props.login}>Login</button>
                            <button onClick={this.props.register}>Register</button>
                        </div>
                    )}
                </div>
                <div>
                    <BookBrowser    socket={this.props.socket}
                                    addToBasket={this.addToBasket.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default CustomerDashboard;