import React, { Component } from 'react';
import formatCurrency from '../util';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false 
        }
    }

    render() {
        const {cartItems} = this.props;

        const handleInput = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        const createOrder = (e) => {
            e.preventDefault();
            const order = {
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                cartItems: this.props.cartItems,
            }
            this.props.createOrder(order);
        }

        return (
            <div>
                {cartItems.length === 0 ? <div className="cart cart-header">Cart is empty</div> : 
                    <div className="cart cart-header">You have {cartItems.length} in the cart{""}</div>
                }

                <div className="cart">
                    <ul className="cart-item">
                        {cartItems.map(item => (
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title}/>
                                </div>
                                <div>
                                <div>{item.title}</div>
                                <div className="right"> 
                                    {formatCurrency(item.price)} x {item.count} {" "}
                                    <button className="button" onClick={() => this.props.removeFromCart(item)}>remove</button>
                                </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {cartItems.length !== 0 && (
                    <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total: {" "}
                                {formatCurrency(cartItems.reduce((acc, cur) => 
                                    acc + cur.price * cur.count, 0
                                ))}
                            </div>
                            <button onClick={() => this.setState({showCheckout: true})} className="button primary">Proceed</button>
                        </div>
                    </div>
    
                    {this.state.showCheckout && (
                        <div className="cart">
                            <form onSubmit={createOrder} >
                                <ul className="form-container">
                                    <li>
                                        <label>Email</label>
                                        <input type="email" name="email" required onChange={this.handleInput}/>
                                    </li>
                                    <li>
                                        <label>Name</label>
                                        <input type="text" name="name" required onChange={handleInput}/>
                                    </li>
                                    <li>
                                        <label>Address</label>
                                        <input type="text" name="address" required onChange={handleInput}/>
                                    </li>
                                    <li><button className="button primary" type="submit">Checkout</button></li>
                                </ul>
                            </form>
                        </div>
                    )}
                    </div>
                    )}
                </div>
        );
    }
}

export default Cart;