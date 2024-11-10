import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import authReducer from './slices/userSlice'
import cartReducer from './slices/addToCartSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(baseApi.middleware),
});
