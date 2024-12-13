import { useState, useEffect } from 'react';
import {deleteProduct, fetchCategories, fetchProducts } from "../services/products.js";
export const useCategories = () => {
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const categories = await fetchCategories();
                setCategories(categories);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        load();
    }, []);

    return { categories, loading, error };
};

export const useProducts = (page = 1, search = "", isDeletedSuccessfull) => {
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const { results, count } = await fetchProducts(page, search);
                setProducts(results);
                setTotalPages(count);
                setIsLoading(false);
            } catch (err) {
                setErrorMessage(err);
                setIsLoading(false);
            }
        };

        load();
    },[page, search, isDeletedSuccessfull]);
    return { isLoading, totalPages, products, errorMessage }
}

export const useProductDelete = (id) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                await deleteProduct(id);
                setError(false)
            }
                // eslint-disable-next-line no-unused-vars
            catch (error) {
                setError(true);
                setLoading(false);
            }
        })();
    }, [id]);
    return { loading , error };
}