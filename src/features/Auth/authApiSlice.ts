import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signin: builder.mutation({
            query: credentials => ({
                url: "/auth/signin",
                method: "POST",
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: "/users/register",
                method: "POST",
                body: { ...credentials }
            })

        }),
        signout: builder.mutation({
            query: () => ({
                url: "auth/signout",
                method: "POST"
            })
        })
    })
});


export const {
    useSigninMutation,
    useRegisterMutation,
    useSignoutMutation
} = authApiSlice;