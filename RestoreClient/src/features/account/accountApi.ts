import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../app/models/user";
import { LoginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../app/routes/Routes";

export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["UserInfo"],
    endpoints: (builder)=>({
        login: builder.mutation<void, LoginSchema>({
            query: (creds)=>({url:"login?useCookies=true", method:"POST", body: creds}),
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try{
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                }catch(err){
                    console.log(err);
                }
            }
        }),
        register: builder.mutation<void, object>({
            query: (creds)=> ({url:"account/register", method:"POST", body:creds}),
        }),
        userInfo: builder.query<User, void>({
            query: ()=> ({url:"account/user-info"}),
            providesTags: ["UserInfo"]
        }),
        logout: builder.mutation<void,void>({
            query: ()=> ({url:"account/logout", method:"POST"}),
            onQueryStarted: async(_, {dispatch, queryFulfilled})=>{
                await queryFulfilled;
                dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                router.navigate('/');
            }
        })
    })
});

export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useUserInfoQuery} = accountApi;