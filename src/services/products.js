import axios from "axios";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

// Fetch categories
export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${BASE_API_URL}/products/categories`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        return response.data.results;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

// Fetch a single product by ID
export const fetchProduct = async (id) => {
    try {
        const response = await axios.get(`${BASE_API_URL}/products/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
    }
};

// Fetch products
export const fetchProducts = async (page = 1, search = "") => {
    try {
        const response = await axios.get(`${BASE_API_URL}/products`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
            params: { page, search },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

// Delete product
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${BASE_API_URL}/products/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

// Create a new product
export const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/products`, productData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${BASE_API_URL}/products/${id}`, productData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};
