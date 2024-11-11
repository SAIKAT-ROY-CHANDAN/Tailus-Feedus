// import { configureStore } from '@reduxjs/toolkit';
// import { baseApi } from './api/baseApi';
// import authReducer from './slices/userSlice'
// import cartReducer from './slices/addToCartSlice'

// export const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath]: baseApi.reducer,
//     auth: authReducer,
//     cart: cartReducer
//   },
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware().concat(baseApi.middleware),
// });

import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import authReducer from './slices/userSlice';
import cartReducer from './slices/addToCartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const cartPersistConfig = {
  key: 'cart',
  storage,
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});


export const persistor = persistStore(store);
