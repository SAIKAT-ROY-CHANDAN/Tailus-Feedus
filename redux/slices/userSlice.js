import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  signUpSuccess: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setSignUpSuccess: (state, action) => {
      state.signUpSuccess = action.payload;
    },
  },
});

export const { setToken, clearToken, setSignUpSuccess } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectSignUpSuccess = (state) => state.auth.signUpSuccess;

export default authSlice.reducer;
