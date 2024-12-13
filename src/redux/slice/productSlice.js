import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    fetchProducts as fetchProductsRequest,
    deleteProduct as deleteProductRequest,
    fetchCategories as fetchCategoriesRequest,
    fetchProduct as fetchProductRequest,
    createProduct as createProductRequest,
    updateProduct as updateProductRequest,
} from "../../services/products";

// Fetch products
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({ page, search }, { rejectWithValue }) => {
        try {
            const response = await fetchProductsRequest(page, search);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching products");
        }
    }
);

// Delete product
export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await deleteProductRequest(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting product");
        }
    }
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
    "products/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const categories = await fetchCategoriesRequest();
            return categories;
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            return rejectWithValue("Error fetching categories");
        }
    }
);

// Fetch a single product by ID
export const fetchProduct = createAsyncThunk(
    "products/fetchProduct",
    async (id, { rejectWithValue }) => {
        try {
            const product = await fetchProductRequest(id);
            return product;
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            return rejectWithValue("Error fetching product details");
        }
    }
);

// Create a new product
export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (productData, { rejectWithValue }) => {
        try {
            const response = await createProductRequest(productData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error creating product");
        }
    }
);

// Update an existing product
export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await updateProductRequest(id, productData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error updating product");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        entities: [],
        categories: [],
        product: null,
        totalPages: 1,
        loading: false,
        errorMessage: "",
    },
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.entities = action.payload.results;
                state.totalPages = Math.ceil(action.payload.count / 10);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload || "Failed to load products";
            })

            // Delete product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.entities = state.entities.filter((product) => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload || "Failed to delete product";
            })

            // Fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload || "Failed to fetch categories";
            })

            // Fetch single product
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload || "Failed to fetch product details";
            })

            // Create product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.entities.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload || "Failed to create product";
            })

            // Update product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.errorMessage = "";
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.entities = state.entities.map((product) =>
                    product.id === action.payload.id ? action.payload : product
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload || "Failed to update product";
            });
    },
});

export default productSlice.reducer;
