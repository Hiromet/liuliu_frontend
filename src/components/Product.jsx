import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProduct, createProduct, updateProduct } from "../redux/slice/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Grid,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mode } = useThemeContext();

    const { categories, product, loading, errorMessage } = useSelector((state) => state.products);

    const [formData, setFormData] = useState({
        product_name: "",
        description: "",
        quantity: "",
        price: "",
        category: "",
    });

    useEffect(() => {
        dispatch(fetchCategories());
        if (id) {
            dispatch(fetchProduct(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (product && id) {
            setFormData(product);
        }
    }, [product, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateProduct({ id, productData: formData }));
        } else {
            dispatch(createProduct(formData));
        }
        navigate("/dashboard/products");
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    backgroundColor: mode === "dark" ? "#1a1a2e" : "#ffffff",
                    color: mode === "dark" ? "#e0e0e0" : "#000000",
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    align="center"
                    sx={{
                        color: mode === "dark" ? "#d48ef5" : "#6a1b9a",
                    }}
                >
                    {id ? "Edit Product" : "Add Product"}
                </Typography>
                {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}
                {loading ? (
                    <CircularProgress sx={{ display: "block", margin: "auto" }} />
                ) : (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Product Name"
                                    name="product_name"
                                    value={formData.product_name}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth variant="outlined" required>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        label="Category"
                                    >
                                        <MenuItem value="">
                                            <em>Select Category</em>
                                        </MenuItem>
                                        {categories.map((category) => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 3,
                                background: "linear-gradient(90deg, #d48ef5, #ff8f70)",
                                color: "#fff",
                                "&:hover": {
                                    background: "linear-gradient(90deg, #b86de5, #ff7d5f)",
                                },
                            }}
                        >
                            {id ? "Save Changes" : "Add Product"}
                        </Button>
                    </form>
                )}
            </Paper>
        </Container>
    );
};

export default Product;
