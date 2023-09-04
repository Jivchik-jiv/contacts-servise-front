import axios from "axios";

interface ISignIn {
    email: string,
    password: string
}

interface IRegister {
    email: string,
    password: string,
    name: string
}

const mockUser = {
    id: "1",
    name: "name",
    email: "email",
    password: "password",
    avatar: "avatar",
    token: "token"
}

const authApi = {
    signin: (data: ISignIn) => {
        return { ...mockUser, ...data }
    },
    signout: () => {
        return true;
    },
    register: (data: IRegister) => {
        return { ...mockUser, ...data }
    }
}