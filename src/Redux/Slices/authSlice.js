import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: null,
        isAuth: false,
    },
    reducers: {
        save: (state, action) => {
            state.user = action.payload;
        },
        authCheck: (state, action) => {
            state.isAuth = action.payload;
        },
    },
});

export const { save, authCheck } = authSlice.actions;
export default authSlice.reducer