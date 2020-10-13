import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import { Link } from 'react-router-dom';
import CheckoutStep from '../actions/components/CheckoutStep';

function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate

    const { cartItems, shipping, payment } = cart;
    if (!shipping.address) {
        props.history.push("/shipping");
    } else {

        if (!payment.paymentMethod) {
            props.location.push("/payment");
        }
    }



    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = () => {
        // create an order
        dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
            taxPrice, totalPrice
        }))
    }
    const dispatch = useDispatch();

    useEffect(() => {
        if (success) {
            props.history.push("/order/" + order._id);
        }

        return () => {
            //
        }
    }, [success]);
    //if not use [success] it will not redirect.
    const checkoutHanler = () => {
        props.history.push("/signin?redirect=shipping")
    }
    return (
        <div>
            <CheckoutStep step1 step2 step3 step4></CheckoutStep>


            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h3>Shipping</h3>
                        <div>
                            {cart.shipping.address}, {cart.shipping.city},
                            {cart.shipping.postalCoad}, {cart.shipping.country}
                        </div>
                    </div>
                    <div>
                        <h3>Payment</h3>
                        <div>
                            Payment Method: {cart.payment.paymentMethod}
                        </div>
                    </div>
                    <div>
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
                                    cartItems.map(item =>
                                        <li key={item.product}>
                                            <div className="cart-image"> <img src={item.image} alt="" /></div>
                                            <div className="cart-name">
                                                <div>
                                                    <Link to={"/order/" + item.product}>
                                                        {item.name}
                                                    </Link>
                                                </div>
                                                <div>Qty: {item.qty}

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
                </div>
            {/* </div> */}
            <div className="placeorder-action">
                <ul>
                    <li>
                        <button onClick={placeOrderHandler} className="button primary full-width" disabled={cartItems.length === 0}>Process to Checkout</button>
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Items</div>
                        <div>${itemsPrice}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${shippingPrice}</div>
                    </li>
                    <li>
                        <div>Tax</div>
                        <div>${taxPrice}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>${totalPrice}</div>
                    </li>
                </ul>


            </div>
        </div>

        </div>

    )
}

export default PlaceOrderScreen;
