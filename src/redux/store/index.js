import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "../slice/clientSlice";
import productReducer from "../slice/productSlice";

const store = configureStore({
    reducer: {
        clients: clientReducer,
        products: productReducer,
    },
});

export default store;
