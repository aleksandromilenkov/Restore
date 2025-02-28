import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { ProductParams } from "../../app/models/productParams";


export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder)=>({
        fetchProducts: builder.query<Product[], ProductParams>({
            query:({pageNumber, pageSize, orderBy, searchTerm, brands, types})=>{
                const params = new URLSearchParams();
                params.append("pageNumber", pageNumber.toString());
                params.append("pageSize", pageSize.toString());
                if (orderBy) params.append("orderBy", orderBy);
                if (searchTerm) params.append("searchTerm", searchTerm);
                if (brands && brands.length > 0) brands.forEach(brand => params.append("brands", brand));
                if (types && types.length > 0) types.forEach(type => params.append("types", type));
                return { url: `products?${params.toString()}` };
            }
        }),
        fetchProductsDetails: builder.query<Product, number>({
            query:(productId)=> `products/${productId}`
        }),
        fetchFilters: builder.query<{brands: string[], types:string[]}, void>({
            query:()=> "products/filters"
        }),
    })
})

export const {useFetchProductsDetailsQuery, useFetchProductsQuery, useFetchFiltersQuery} = catalogApi;