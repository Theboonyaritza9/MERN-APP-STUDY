import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    console.log('Length: ',cartItems.length);
    const productId = props.match.params.id;
    // qty=10 ==> [0]:qty, [1]=10
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if (productId) {
            // console.log('cart true', productId, qty)
            dispatch(addToCart(productId, qty));
        }
        return () => {
            //
        }
    }, []);
    const checkoutHanler = () => {
        // Link to Signin Page first and then check values
        props.history.push("/signin?redirect=shipping")
    }
    return (
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>
                            Price
                        </div>
                    </li>
                    {
                        cartItems.length === 0 ?
                            <div>
                                Cart is empty
                            </div>
                            :
                            cartItems.map((item, index) =>
                                <li key={item.product+index}>
                                    <div className="cart-image"> <img src={item.image} alt="" /></div>
                                    <div className="cart-name">
                                        <div>
                                            <Link to={"/product/" + item.product}>
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="details-qty">
                                            <span>Qty: </span>
                                            <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                                {[...Array(item.countInstock).keys()].map(x =>
                                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                )}
                                            </select>
                                            <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart-price">
                                        ${item.price}
                                    </div>
                                </li>
                            )
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items )  :
                $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h3>
                <button onClick={checkoutHanler} className="button primary full-width" disabled={cartItems.length === 0}>Process to Checkout</button>

            </div>
        </div>
    )
}

export default CartScreen;
