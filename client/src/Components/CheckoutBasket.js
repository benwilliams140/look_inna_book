import React from 'react'

class CheckoutBasket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basket: []
        };
    }

    handleChange(event) {
        let bookIndex = this.state.basket.findIndex((book) => book.isbn === event.target.id);
        let tmpBasket = [...this.state.basket];
        let item = {
            ...tmpBasket[bookIndex],
            count: event.target.value
        }
        tmpBasket[bookIndex] = item;
        this.setState({basket: tmpBasket});
        this.props.socket.emit('updateBasketCount', this.props.basketID, item);
    }

    componentDidMount() {
        this.props.socket.on('basketContents', (basket) => {
            this.setState({
                basket: basket
            });
        });

        if(this.props.basketID) {
            this.props.socket.emit('retrieveBasket', this.props.basketID);
        }
    }

    removeFromBasket(event) {
        let basket = this.state.basket.filter((item) => item.isbn !== event.target.name);
        this.setState({
            basket: basket
        });
        this.props.socket.emit('removeFromBasket', this.props.basketID, event.target.name)
    }

    checkout(event) {
        
    }

    renderBasket() {
        return(
            this.state.basket.map((item) => {
                return(
                    <tr key={item.isbn}>
                        <td>{item.isbn}</td>
                        <td>{item.name}</td>
                        <td>
                            <input id={item.isbn} type='number' min={1} max={item.max_count} value={item.count} onChange={this.handleChange.bind(this)}/>
                        </td>
                        <td>
                            <button name={item.isbn} onClick={this.removeFromBasket.bind(this)}>Delete</button>
                        </td>
                    </tr>
                )
            })
        )
    }

    render() {
        return (
            <div>
                Checkout Basket
                {
                    this.props.basketID ?
                    <div>
                        <table>
                            <thead>
                                <tr key='header'>
                                    <th>ISBN</th>
                                    <th>Name</th>
                                    <th>Count</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBasket()}
                            </tbody>
                        </table>
                    </div> :
                    <div>
                        <p>You do not currently have anything in your basket.</p>
                    </div>
                }
                {
                    this.props.userID ?
                    <button onClick={this.checkout.bind(this)}>Checkout</button> :
                    <p>You must be registered to checkout.</p>
                }
                <button onClick={this.props.goToDashboard}>Close</button>
            </div>
        )
    }
}

export default CheckoutBasket;