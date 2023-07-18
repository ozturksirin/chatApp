import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: null,
    },
    reducers: {
        save: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { save } = authSlice.actions;
export default authSlice.reducer