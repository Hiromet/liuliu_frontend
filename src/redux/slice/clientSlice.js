import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    updateClient as updateClientRequest ,
    createClient as createClientRequest,
    fetchClients,
    deleteClient as deleteClientRequest,
    fetchClientData
} from "../../services/clients.js";

export const loadClients = createAsyncThunk(
    'clients/loadClients',
    async ({page, search}) => await fetchClients(page, search)
)

export const deleteClient = createAsyncThunk(
    'clients/deleteClient',
    async (id) => {
        await deleteClientRequest(id)
        return id;
    }
)

export const loadClient = createAsyncThunk(
    'clients/loadClient',
    async (id) => await fetchClientData(id)
)

export const createClient = createAsyncThunk(
    'clients/createClient',
    async (clientData) => {
        const response = await createClientRequest(clientData)
        return response.data;

    }
)

export const updateClient = createAsyncThunk(
    'clients/updateClient',
    async ({id, clientData}) => {
        const response = await updateClientRequest(id, clientData)
        return response.data;
    }
)

export const clientSlice = createSlice({
    name: 'clients',
    initialState: {
        loading: false,
        entities: [],
        currentEntity: {},
        totalPages: null,
        errorMessage: '',
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadClients.pending, (state) => {
                state.loading = true
            })
            .addCase(loadClients.fulfilled, (state, action) => {
                state.loading = false
                state.entities = action.payload.results;
                state.totalPages = Math.ceil(action.payload.count / 10);
            })
            .addCase(loadClients.rejected, (state) => {
                state.loading = false
                state.errorMessage = "Error al listar los clientes";
            })
            .addCase(deleteClient.pending, () => {})
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.entities = state.entities.filter((client) => client.id !== action.payload)
            })
            .addCase(deleteClient.rejected, (state) => {
                state.errorMessage = "Error al eliminar el cliente";
            })
            .addCase(loadClient.pending, (state) =>{
                state.loading = true
            })
            .addCase(loadClient.fulfilled, (state, action) => {
                state.loading = false
                state.currentEntity = action.payload;
            })
            .addCase(loadClient.rejected, (state) => {
                state.loading = false
                state.errorMessage = "Error al cargar los datos del cliente";
            })
            .addCase(createClient.pending, (state) =>{
                state.loading = true
            })
            .addCase(createClient.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(createClient.rejected, (state) => {
                state.loading = false
                state.errorMessage = "Error al guardar los datos del cliente";
            })
            .addCase(updateClient.pending, (state) =>{
                state.loading = true
            })
            .addCase(updateClient.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateClient.rejected, (state) => {
                state.loading = false
                state.errorMessage = "Error al actualizar los datos del cliente";
            })
    }
})

export default clientSlice.reducer