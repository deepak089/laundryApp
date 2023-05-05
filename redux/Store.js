import { configureStore } from '@reduxjs/toolkit'
import  CartReducer  from './slice/CartSlice';
import  ProductReducer  from './slice/ProductSlice';

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    product:ProductReducer
  },
})