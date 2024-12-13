import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "../components/Datatable.jsx";
import { fetchProducts, deleteProduct } from "../redux/slice/productSlice.js";
import Pagination from "../components/Pagination";
import {
    Button,
    Container,
    TextField,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../styles/products.css";

const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        entities: products,
        totalPages,
        loading: isLoading,
        errorMessage: loadProductError,
    } = useSelector((state) => state.products);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        dispatch(fetchProducts({ page: currentPage, search: debouncedSearchTerm }));
    }, [dispatch, currentPage, debouncedSearchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const openDialog = (product) => {
        setSelectedProduct(product);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedProduct(null);
        setIsDialogOpen(false);
    };

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(selectedProduct.id));
        closeDialog();
    };

    const handleRowClick = (id) => {
        navigate(`/dashboard/products/${id}/edit`);
    };

    const handleAddProduct = () => {
        navigate("/dashboard/products/add");
    };

    const columns = ["ID", "Product Name", "Description", "Quantity", "Price", "Category"];

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            background: "linear-gradient(90deg, #d48ef5, #ff8f70)",
                            color: "#fff",
                            "&:hover": {
                                background: "linear-gradient(90deg, #b86de5, #ff7d5f)",
                            },
                        }}
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </Button>
                </Grid>
            </Grid>

            {isLoading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
            {!isLoading && (
                <>
                    {loadProductError && (
                        <Box color="error.main" sx={{ mb: 2 }}>
                            {loadProductError}
                        </Box>
                    )}
                    <DataTable
                        columns={columns}
                        data={products}
                        onRowClick={handleRowClick}
                        onDeleteClick={openDialog}
                        noDataMessage="No products found."
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
            <Dialog open={isDialogOpen} onClose={closeDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete{" "}
                        <strong>{selectedProduct?.product_name}</strong>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteProduct} color="error" variant="contained">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Products;
