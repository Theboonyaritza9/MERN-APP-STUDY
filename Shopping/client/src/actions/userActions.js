import Axios from "axios";
import Cookie from 'js-cookie';
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_LOGOUT, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS, USER_UPDATE_REQUEST
}
    from "./userConstants";

export const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
    // After use Dispatch You can use store'value from InitialState of Redux suddenly
    // Such as const { cart: {cartItems} } = getState();

    const { userSignin: { userInfo } } = getState(); // return {}

    // console.log('Get State Update: ', userInfo);
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
    try {
        // if Token correct then It will send data
        const { data } = await Axios.put('/api/users/' + userId, { name, email, password }, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data)); // When you close app and open it again
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });

    }
}

export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post('/api/users/signin', { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        // console.log('Data Login in Action: ', data) // Return {id: '1234', name: 'beb'} => send to Store.js
        Cookie.set('userInfo', JSON.stringify(data)); // When you close app and open it again
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });

    }
}

export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
        const { data } = await Axios.post('/api/users/register', { name, email, password });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data)); // When you close app and open it again
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });

    }
}

export const logout = () => dispatch => {
    Cookie.remove("userInfo");
    dispatch({ type: USER_LOGOUT })
}