import { createApi } from "@reduxjs/toolkit/query/react";
import { Product } from "../../app/models/product";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { ProductParams } from "../../app/models/productParams";
import { Pagination } from "../../app/models/pagination";


export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder)=>({
        fetchProducts: builder.query<{items: Product[], pagination: Pagination}, ProductParams>({
            query:({pageNumber, pageSize, orderBy, searchTerm, brands, types})=>{
                const params = new URLSearchParams();
                params.append("pageNumber", pageNumber.toString());
                params.append("pageSize", pageSize.toString());
                if (orderBy) params.append("orderBy", orderBy);
                if (searchTerm) params.append("searchTerm", searchTerm);
                if (brands && brands.length > 0) params.append("brands", brands.join(","));
                if (types && types.length > 0)params.append("types", types.join(","));
                return { url: `products?${params.toString()}` };
            },
            transformResponse: (items:Product[], meta)=>{
                const paginationHeader = meta?.response?.headers.get('Pagination');
                const pagination = paginationHeader ? JSON.parse(paginationHeader) : null;
                return {items, pagination};
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