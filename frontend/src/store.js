import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { productdetailsreducer, productreducer } from "./reducers/productreducer";
import { userReducer,profileReducer, forgotPasswordReducer } from "./reducers/userreducer";
import { cartReducer } from "./reducers/cartreducer";

let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      
    },
  };
const reducer=combineReducers({
    products:productreducer,
    productdetails:productdetailsreducer,
    user:userReducer,
    profile:profileReducer,
    forgotpassword:forgotPasswordReducer,
    cart:cartReducer
})
const store= configureStore({
    initialState,
    reducer,
})

export default store;