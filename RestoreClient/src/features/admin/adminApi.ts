import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Product } from "../../app/models/product";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        createProduct: builder.mutation<Product, FormData>({
            query:(data: FormData) => {
                return {
                    url:"products",
                    method:"POST",
                    body:data,
                }
            }
        }),
        updateProduct: builder.mutation<void, {id:number, product:FormData}>({
            query:({id, product}) => {
                product.append('id', id.toString());
                return {
                    url: "products",
                    method: "PUT",
                    body: product,
                }
            }
        })
    })
})

export const {useCreateProductMutation, useUpdateProductMutation} = adminApi;