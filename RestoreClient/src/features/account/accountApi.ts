import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../app/models/user";
import { LoginSchema } from "../../lib/schemas/loginSchema";

export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder)=>({
        login: builder.mutation<void, LoginSchema>({
            query: (creds)=>({url:"login?useCookies=true", method:"POST", body: creds}),
        }),
        register: builder.mutation<void, object>({
            query: (creds)=> ({url:"account/register", method:"POST", body:creds}),
        }),
        userInfo: builder.query<User, void>({
            query: ()=> ({url:"account/user-info"})
        }),
        logout: builder.mutation<void,void>({
            query: ()=> ({url:"account/logout", method:"POST"})
        })
    })
});

export const {useLoginMutation, useRegisterMutation, useLogoutMutation} = accountApi;