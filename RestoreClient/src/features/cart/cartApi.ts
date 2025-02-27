import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Cart } from "../../app/models/cart";
import { CreateCartItem } from "../../app/models/createCartItem";
import { CartItem } from "../../app/models/cartItem";
import { DeleteCartItem } from "../../app/models/deleteCartItem";
import { Product } from "../../app/models/product";
const isCartItem = (product: Product | CartItem): product is CartItem => {
  return (product as CartItem).quantity !== undefined;
};

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    fetchCart: builder.query<Cart, void>({
      query: () => ({ url: "cart" }),
      providesTags: ["Cart"],
    }),
    addItemToCart: builder.mutation<Cart, CreateCartItem>({
      query: ({ product, quantity }) => {
        const productId = isCartItem(product) ? product.productId : product.id;
        return {
          url: `cart?productId=${productId}&quantity=${quantity}`,
          method: "POST",
        };
      },
      onQueryStarted: async ({ product, quantity },{ dispatch, queryFulfilled }) => {
        // manually updating the cached data from fetchCart query
        let isNewCart = false;
        const patchResult = dispatch(
          cartApi.util.updateQueryData("fetchCart", undefined, (draftData) => {
            if (!draftData) isNewCart = true;
            if (!isNewCart) {
              const productId = isCartItem(product)
                ? product.productId
                : product.id;
              const existingItem = draftData.items.find(
                (i) => i.productId === productId
              );
              if (existingItem) existingItem.quantity += quantity;
              else
                draftData.items.push(
                  isCartItem(product)
                    ? product
                    : { ...product, productId: product.id, quantity: quantity }
                );
            }
          })
        );
        try {
          await queryFulfilled;
          if(isNewCart) dispatch(cartApi.util.invalidateTags(["Cart"]));
        } catch (error) {
          console.log(error);
          // if addItemToCart mutation fails then the manually updated data is reverted
          patchResult.undo();
        }
      },
    }),
    removeItemFromCart: builder.mutation<Cart, DeleteCartItem>({
      query: (cartItem) => ({
        url: `cart?productId=${cartItem.productId}&quantity=${cartItem.quantity}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        // manually updating the cached data from fetchCart query
        const patchResult = dispatch(
          cartApi.util.updateQueryData("fetchCart", undefined, (draftData) => {
            const itemIndex = draftData.items.findIndex(
              (i) => i.productId === productId
            );
            if (itemIndex >= 0) {
              draftData.items[itemIndex].quantity -= quantity;
              if (draftData.items[itemIndex].quantity <= 0) {
                draftData.items.splice(itemIndex, 1);
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          // if removeItemFromCart mutation fails then the manually updated data is reverted
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchCartQuery,
  useAddItemToCartMutation,
  useRemoveItemFromCartMutation,
} = cartApi;
