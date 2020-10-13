import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutStep from '../actions/components/CheckoutStep';

function PaymentScreen(props) {

    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePayment({ paymentMethod }));
        props.history.push('placeorder');

    }

    return (

        <div>
            <CheckoutStep step1 step2 step3 ></CheckoutStep>

            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li><h2>Shipping</h2></li>
                        <li>
                            <div>
                                <input type="radio" name="paymentMethod" id="paymentMethod"
                                    onChange={(e) => setPaymentMethod(e.target.value)} value="paypal" />
                                <label htmlFor="Paypal">
                                    Paypal
                                </label>
                            </div>

                        </li>
                        <li>
                            <button type="submit" className="button primary">Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>


    )
}

export default PaymentScreen;
