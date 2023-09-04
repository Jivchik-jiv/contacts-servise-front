import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/Auth/authSlice';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { apiSlice } from "./api/apiSlice";
import profileReducer from "../features/Profile/profileSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: profileReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;