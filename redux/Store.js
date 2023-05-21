import { configureStore } from '@reduxjs/toolkit'
import  CartReducer  from './slice/CartSlice';
import  ProductReducer  from './slice/ProductSlice';
import UserReducer from './slice/UserSlice';

export const store = configureStore({
  reducer: {
    user:UserReducer,
    cart: CartReducer,
    product:ProductReducer,
  },
})