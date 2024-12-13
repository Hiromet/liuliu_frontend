import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useDistricts } from "../hooks/clientshooks";
import { loadClient, createClient, updateClient } from "../redux/slice/clientSlice.js";

import {
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CircularProgress,
    Alert,
    Container,
    Paper,
    Grid,
} from "@mui/material";

const Client = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            firstname: "", lastname: "", district: "", address: "", references: "",
            phone_number: "", email: "", birthday: null, lat: null, lng: null
        }
    });
    const { districts, loading: districtsLoading, errorMessage: districtsError } = useDistricts();
    const {
        currentEntity: client,
        loading: clientLoading,
        errorMessage: clientError
    } = useSelector(state => state.clients);

    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            reset(client);
        }
    }, [client, reset]);

    useEffect(() => {
        if (id) {
            dispatch(loadClient(id));
        }
    }, [id, dispatch]);

    const onSubmit = async (clientData) => {
        if (id) {
            dispatch(updateClient({ id, clientData }));
        } else {
            dispatch(createClient(clientData));
        }
        navigate("/dashboard/clients");
    };

    const isLoading = districtsLoading || clientLoading;
    const error = districtsError || clientError;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                {isLoading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
                {!isLoading && (
                    <>
                        <Typography variant="h4" gutterBottom align="center" sx={{ color: "#d48ef5" }}>
                            {id ? "Edit Client" : "Add Client"}
                        </Typography>
                        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="First Name"
                                        fullWidth
                                        variant="outlined"
                                        {...register("firstname", { required: "First name is required" })}
                                        error={!!errors.firstname}
                                        helperText={errors.firstname?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Last Name"
                                        fullWidth
                                        variant="outlined"
                                        {...register("lastname", { required: "Last name is required" })}
                                        error={!!errors.lastname}
                                        helperText={errors.lastname?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined" error={!!errors.district}>
                                        <InputLabel>District</InputLabel>
                                        <Controller
                                            name="district"
                                            control={control}
                                            rules={{ required: "District is required" }}
                                            render={({ field }) => (
                                                <Select {...field} label="District">
                                                    <MenuItem value="">Select District</MenuItem>
                                                    {districts.map(district => (
                                                        <MenuItem key={district.value} value={district.value}>
                                                            {district.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Address" fullWidth variant="outlined" {...register("address")} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="References" fullWidth variant="outlined" {...register("references")} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Phone Number"
                                        fullWidth
                                        variant="outlined"
                                        {...register("phone_number", {
                                            required: "Phone number is required",
                                            maxLength: { value: 9, message: "Phone number must be 9 digits" },
                                            pattern: { value: /^\d{9}$/, message: "Phone number must be numeric" }
                                        })}
                                        error={!!errors.phone_number}
                                        helperText={errors.phone_number?.message}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Email"
                                        fullWidth
                                        variant="outlined"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Please enter a valid email address" }
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField label="Birthday" type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} {...register("birthday")} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Latitude" fullWidth variant="outlined" {...register("lat", { valueAsNumber: true })} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Longitude" fullWidth variant="outlined" {...register("lng", { valueAsNumber: true })} />
                                </Grid>
                            </Grid>
                            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                                {id ? "Save Changes" : "Add Client"}
                            </Button>
                        </form>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default Client;
