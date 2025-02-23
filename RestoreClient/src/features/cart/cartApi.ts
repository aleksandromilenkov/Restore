import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Cart } from "../../app/models/cart";
import { CreateCartItem } from "../../app/models/createCartItem";


export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Cart'],
    endpoints: (builder)=>({
        fetchCart: builder.query<Cart, void>({
            query:()=>({url: 'cart'}),
            providesTags: ['Cart']
        }),
        addItemToCart: builder.mutation<Cart, CreateCartItem>({
            query:(cartItem)=>({url: `cart?productId=${cartItem.productId}&quantity=${cartItem.quantity}`, method: 'POST'}),
            onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
                try{
                    await queryFulfilled;
                    dispatch(cartApi.util.invalidateTags(['Cart']));
                }catch(error){
                    console.log(error);
                }
            }
        }),
        removeItemFromCart: builder.mutation<Cart, CreateCartItem>({
            query:(cartItem)=>({url: `cart?productId=${cartItem.productId}&quantity=${cartItem.quantity}`, method: 'DELETE'})
        }),
    })
})

export const {useFetchCartQuery, useAddItemToCartMutation, useRemoveItemFromCartMutation} = cartApi;