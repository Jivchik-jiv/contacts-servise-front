import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


export interface IProfile {
    name: string,
    email: string,
    avatar: string,
    id: string,
}
interface IUserState {
    profile: IProfile
}

type Avatar = string;

export const initialUser: IUserState = {
    profile: {
        name: "",
        email: "",
        avatar: "",
        id: "",
    }

};


const profileSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: {
        setProfile: (state, action: PayloadAction<IProfile>) => {
            state.profile = action.payload;
        },
        setAvatar: (state, action: PayloadAction<Avatar>) => {
            state.profile.avatar = action.payload;
        }
    }
});

export const { setProfile, setAvatar } = profileSlice.actions;

export default profileSlice.reducer;

export const selectProfile = (state: RootState) => state.user.profile;
