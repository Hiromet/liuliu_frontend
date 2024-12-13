import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadClients, deleteClient } from "../redux/slice/clientSlice.js";

import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { DataTable } from "../components/Datatable.jsx";

import { Box, Button, CircularProgress, Alert, Grid, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Clients = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);
    const navigate = useNavigate();
    const { entities, totalPages, loading, errorMessage } = useSelector((state) => state.clients);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadClients({ page: currentPage, search: searchTerm }));
    }, [dispatch, currentPage, searchTerm]);

    const columns = [
        "ID",
        "Firstname",
        "Lastname",
        "District",
        "Address",
        "References",
        "Phone Number",
        "Email",
        "Birthday",
        "Latitude",
        "Longitude",
    ];

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const openDialog = (client) => {
        setClientToDelete(client);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setClientToDelete(null);
    };

    const handleDeleteClient = async () => {
        dispatch(deleteClient(clientToDelete.id));
        closeDialog();
    };

    const handleRowClick = (id) => {
        navigate(`/dashboard/client/${id}/edit`);
    };

    const handleAddClient = () => {
        navigate("/dashboard/clients/add");
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
                <Grid item xs={12} md={6}>
                    <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
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
                        onClick={handleAddClient}
                    >
                        Add Client
                    </Button>
                </Grid>
            </Grid>

            {loading && (
                <Box display="flex" justifyContent="center" my={4}>
                    <CircularProgress />
                </Box>
            )}

            {!loading && (
                <>
                    {errorMessage && (
                        <Alert severity="error" sx={{ marginBottom: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <DataTable
                            data={entities}
                            columns={columns}
                            onRowClick={handleRowClick}
                            onDeleteClick={openDialog}
                            noDataMessage="No clients found."
                        />
                    </Paper>
                    <Box mt={3} display="flex" justifyContent="center">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </Box>
                </>
            )}

            {isDialogOpen && (
                <ConfirmationDialog
                    title="Confirm Deletion"
                    message={`Are you sure you want to delete this client? ${clientToDelete?.firstname} ${clientToDelete?.lastname}`}
                    onClose={closeDialog}
                    onConfirm={handleDeleteClient}
                />
            )}
        </Box>
    );
};

export default Clients;
