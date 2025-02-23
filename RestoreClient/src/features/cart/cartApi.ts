import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Cart } from "../../app/models/cart";
import { CreateCartItem } from "../../app/models/createCartItem";
import { CartItem } from "../../app/models/cartItem";


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
            query:(cartItem)=>({url: `cart?productId=${cartItem.product.id}&quantity=${cartItem.quantity}`, method: 'POST'}),
            onQueryStarted: async ({product, quantity}, {dispatch, queryFulfilled}) => {
                // manually updating the cached data from fetchCart query
                const patchResult = dispatch(
                    cartApi.util.updateQueryData('fetchCart', undefined, (draftData)=>{
                        const existingItem = draftData.items.find(i=> i.productId === product.id);
                        if(existingItem) existingItem.quantity += quantity;
                        else draftData.items.push(new CartItem(product, quantity));
                    })
                )
                try{
                    await queryFulfilled;

                }catch(error){
                    console.log(error);
                    // if addItemToCart mutation fails then the manually updated data is reverted
                    patchResult.undo();
                }
            }
        }),
        removeItemFromCart: builder.mutation<Cart, CreateCartItem>({
            query:(cartItem)=>({url: `cart?productId=${cartItem.product.id}&quantity=${cartItem.quantity}`, method: 'DELETE'})
        }),
    })
})

export const {useFetchCartQuery, useAddItemToCartMutation, useRemoveItemFromCartMutation} = cartApi;