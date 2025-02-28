import { createSlice } from "@reduxjs/toolkit";
import { ProductParams } from "../../app/models/productParams";
const initialState: ProductParams = {
    pageNumber: 1,
    pageSize: 8,
    searchTerm: "",
    orderBy: "name",
    brands: [],
    types: [],
}
export const catalogSlice = createSlice({
    name: 'catalogSlice',
    initialState: initialState,
    reducers:{
        setPageNumber: (state, action)=> {
            state.pageNumber = action.payload
        },
        setPageSize: (state, action)=> {
            state.pageNumber = action.payload
        },
        setSearchTerm: (state, action)=> {
            state.searchTerm = action.payload;
            state.pageNumber = 1;
        },
        setOrderBy: (state, action)=>{
           state.orderBy = action.payload;
           state.pageNumber = 1;
        },
        setBrands: (state, action)=>{
            state.brands = action.payload;
            state.pageNumber = 1;
        },
        setTypes: (state, action)=>{
            state.types = action.payload
            state.pageNumber = 1;
        },
        resetParams(){
            return initialState;
        }
    }
})

export const {setPageNumber, setPageSize, setSearchTerm, setOrderBy, setBrands, setTypes, resetParams} = catalogSlice.actions;