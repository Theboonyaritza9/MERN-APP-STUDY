import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie'
import { cartReducer } from './reducers/cartReducers';
import {userSigninReducer, userRegisterReducer, userUpdateReducer} from './reducers/userReducers';
import { OrderCreateReducer, orderDetailsReducer, orderPayReducer, orderDeleteReducer, orderListReducer, myOrderListReducer } from './reducers/orderReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
// console.log('Cookie Store: ', userInfo); // Return {id: '1234', name: 'Beb'}

const initailState = { cart: { cartItems, shipping: {}, payment: {} }, userSignin: {userInfo} };
// console.log('Info User', initailState.userSignin) // Return {userInfo: {id:1234, name: 'beb'}}
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: OrderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    userUpdate: userUpdateReducer,
    myOrderList: myOrderListReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initailState, composeEnhancer(applyMiddleware(thunk)));
export default store;