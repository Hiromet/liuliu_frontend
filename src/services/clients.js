import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const fetchClients = async (page = 1, search = "") => {
    const response = await axios.get(`${BASE_API_URL}/clients`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        params: { page, search },
    });
    return response.data;
};

export const deleteClient = async (id) => {
    await axios.delete(`${BASE_API_URL}/clients/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    });
};

export const fetchClientData = async (id) => {
    const response = await axios.get(`${BASE_API_URL}/clients/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    });
    return response.data;
};

export const fetchDistricts = async () => {
    const response = await axios.get(`${BASE_API_URL}/districts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    });
    return Array.isArray(response.data) ? response.data : response.data.districts || [];
};

export const saveClient = async (id, clientData) => {
    const response = await axios({
        method: id ? "put" : "post",
        url: id ? `${BASE_API_URL}/clients/${id}` : `${BASE_API_URL}/clients`,
        data: clientData,
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    });
    return response;
};

export const createClient = async (clientData) => {
    const response = await axios({
        method: "post",
        url: `${BASE_API_URL}/clients`,
        data: clientData,
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    });
    return response;
};

export const updateClient = async (id, clientData) => {
    const response = await axios({
        method: "put",
        url: `${BASE_API_URL}/clients/${id}`,
        data: clientData,
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    });
    return response;
};
