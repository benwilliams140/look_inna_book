import React from 'react'

class CheckoutBasket extends React.Component {
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
                Checkout Basket           
            </div>
        )
    }
}

export default CheckoutBasket;