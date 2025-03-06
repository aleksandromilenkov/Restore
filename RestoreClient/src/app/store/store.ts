import { configureStore} from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux";
import { catalogApi } from "../../features/catalog/catalogApi";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../../features/about/ErrorApi";
import { cartApi } from "../../features/cart/cartApi";
import { catalogSlice } from "../../features/catalog/catalogSlice";
import { accountApi } from "../../features/account/accountApi";
import { checkoutApi } from "../../features/checkout/checkoutApi";

export const store = configureStore({
    reducer:{
        [catalogApi.reducerPath]: catalogApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [checkoutApi.reducerPath]: checkoutApi.reducer,
        ui: uiSlice.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        catalogSlice: catalogSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware()
        .concat(
            catalogApi.middleware,
            cartApi.middleware,
            accountApi.middleware,
            checkoutApi.middleware,
            errorApi.middleware
        )// Add api middleware for caching and automaticaly refetching
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();