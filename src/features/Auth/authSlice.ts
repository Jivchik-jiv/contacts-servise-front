import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


interface AuthState {
    token: string | null;
}

const initialState: AuthState = {
    token: null
}




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        signOut: (state) => {
            state.token = null;
        },
    }
});

export const { setAuth, signOut } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;