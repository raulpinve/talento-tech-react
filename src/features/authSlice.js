import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null, 
    isAutheticated: false
}

const authSlice = createSlice({
    name: 'auth', 
    initialState, 
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token, 
            state.isAutheticated = true;
            state.user = action.payload.user;
        }, 
        logout: (state) => {
            state.token = null;
            state.isAutheticated = false;
            state.user = null
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer