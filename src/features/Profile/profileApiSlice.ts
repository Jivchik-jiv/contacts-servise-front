import { apiSlice } from "../../app/api/apiSlice";

export const profileApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query({
            query: () => "/users"
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/users/update",
                method: "PATCH",
                body: data,
            }),
        }),
        updateProfileAvatar: builder.mutation({
            query: (file) => ({
                url: "/users/avatar",
                method: "PATCH",
                body: file,
            }),
        }),
        changePassword: builder.mutation({
            query: (updateObj) => ({
                url: "/users/password",
                method: "PATCH",
                body: updateObj,
            }),
        }),

    })
});


export const {
    useLazyGetProfileQuery,
    useGetProfileQuery,
    useUpdateProfileAvatarMutation,
    useUpdateProfileMutation,
    useChangePasswordMutation
} = profileApiSlice;