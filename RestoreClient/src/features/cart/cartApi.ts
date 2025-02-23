import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Cart } from "../../app/models/cart";
import { CreateCartItem } from "../../app/models/createCartItem";


export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder)=>({
        fetchCart: builder.query<Cart, void>({
            query:()=>({url: 'cart'})
        }),
        addItemToCart: builder.mutation<Cart, CreateCartItem>({
            query:(cartItem)=>({url: `cart?productId=${cartItem.productId}&quantity=${cartItem.quantity}`, method: 'POST'})
        }),
        removeItemFromCart: builder.mutation<Cart, CreateCartItem>({
            query:(cartItem)=>({url: `cart?productId=${cartItem.productId}&quantity=${cartItem.quantity}`, method: 'DELETE'})
        }),
    })
})

export const {useFetchCartQuery, useAddItemToCartMutation, useRemoveItemFromCartMutation} = cartApi;