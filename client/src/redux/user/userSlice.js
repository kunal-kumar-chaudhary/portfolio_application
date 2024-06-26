import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isFetching: false,
    error: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action)=>{
            state.isFetching = false;
            state.user = action.payload;
        },
        loginFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {loginStart, loginSuccess, loginFailure} = userSlice.actions;
export default userSlice.reducer;