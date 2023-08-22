import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: null,
        isAuth: false,
    },
    reducers: {
        save: (state, action) => {
            // console.log('action', action.payload);
            state.user = action.payload;
        },
        authCheck: (state, action) => {
            // console.log('action', action.payload);
            state.isAuth = action.payload;
        },
    },
});

export const { save, authCheck } = authSlice.actions;
export default authSlice.reducer