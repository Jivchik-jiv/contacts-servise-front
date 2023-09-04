
import { apiSlice } from "../../app/api/apiSlice";



export interface IUpdateContact {
    name: string,
    phone: string,
    email: string | null,
    company: string | null,
}

export const contactsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => "/contacts",
            providesTags: ["Contacts"]
        }),
        getContactById: builder.query({
            query: (id: string) => `/contacts/${id}`
        }),
        addContact: builder.mutation({
            query: data => ({
                url: "/contacts",
                method: "POST",
                body: data,
                invalidatesTags: ["Contacts"]
            })
        }),
        updateFriends: builder.mutation({
            query: ({ id, isFriend }: { id: string, isFriend: boolean }) => ({
                url: "/contacts/" + id + "/friends",
                method: "PATCH",
                body: { isFriend },
                invalidatesTags: ["Contacts"]
            })
        }),
        updateAvatar: builder.mutation({
            query: ({ id, avatar }: { id: string, avatar: FormData }) => ({
                url: "/contacts/" + id + "/avatar",
                method: "PATCH",
                body: avatar,
                invalidatesTags: ["Contacts"]
            }),
        }),

        updateContact: builder.mutation({
            query: ({ id, contact }: { id: string, contact: Partial<IUpdateContact> }) => ({
                url: "/contacts/" + id,
                method: "PATCH",
                body: contact,
                invalidatesTags: ["Contacts"]
            }),
        }),
        deleteContact: builder.mutation({
            query: (id: string) => ({
                url: `/contacts/${id}`,
                method: "DELETE",
                invalidatesTags: ["Contacts"]
            })
        })
    })
});



export const {
    useGetContactsQuery,
    useGetContactByIdQuery,
    useAddContactMutation,
    useDeleteContactMutation,
    useUpdateFriendsMutation,
    useUpdateAvatarMutation,
    useUpdateContactMutation
} = contactsApiSlice;