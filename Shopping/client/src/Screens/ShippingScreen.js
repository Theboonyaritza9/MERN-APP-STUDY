import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutStep from '../actions/components/CheckoutStep';

function ShippingScreen(props) {

    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCoad, setPostalCoad] = useState('');
    const [country, setCountry] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({address, city, postalCoad, country}));
        props.history.push('payment');

    }

    return (

        <div>
            <CheckoutStep step1 step2 ></CheckoutStep>

            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li><h2>Shipping</h2></li>
                        <li>
                            <label htmlFor="Address">
                                Address
                        </label>
                            <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="city">
                                City
                        </label>
                            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="postalCoad">
                                Postal Coad
                        </label>
                            <input type="text" name="postalCoad" id="postalCoad" onChange={(e) => setPostalCoad(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="country">
                                Country
                        </label>
                            <input type="text" name="country" id="country" onChange={(e) => setCountry(e.target.value)} />
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

export default ShippingScreen;
