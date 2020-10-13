import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";
import Cookie from 'js-cookie';


export const addToCart = (productId, qty) => async (dispatch, getState) => {
    try{
        const {data} = await Axios.get("/api/products/"+ productId);
        // console.log(data)
        dispatch({type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInstock: data.countInstock,
            qty

        }});

        const {cart: {cartItems}} = getState(); // Return Object[]
        // console.log('Object: ', cartItems + ' AND ' + 'JSON: ', JSON.stringify(cartItems))

        Cookie.set("cartItems", JSON.stringify(cartItems)); // Return JSON[{"product":"123456789"}]

    } catch(error){

    }
}

export const removeFromCart = (orderId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: orderId});

    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

export const saveShipping = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING, payload: data});
}

export const savePayment = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT, payload: data});
}