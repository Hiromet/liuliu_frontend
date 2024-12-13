import { useState, useEffect } from "react";
import { fetchClients, deleteClient, fetchClientData, fetchDistricts, saveClient } from "../services/clients.js";

export const useClients = (page = 1, search = "") => {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const load = async () => {
            try {
                const { results, count } = await fetchClients(page, search);
                setClients(results);
                setTotalPages(Math.ceil(count / 10));
                setLoading(false);
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setErrorMessage("Error al listar los clientes");
                setLoading(false);
            }
        };

        load();
    }, [page, search]);

    const removeClient = async (id) => {
        try {
            await deleteClient(id);
            setClients((prevClients) => prevClients.filter((client) => client.id !== id));
        } catch (error) {
            setErrorMessage("Error al eliminar el cliente");
            return error;
        }
    };

    return { clients, loading, errorMessage, totalPages, removeClient };
};

export const useClientData = (id) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [client, setClient] = useState({});

    useEffect(() => {
        if (id) {
            const loadClientData = async () => {
                try {
                    setLoading(true);
                    const data = await fetchClientData(id);
                    setClient(data);
                    setLoading(false);
                    // eslint-disable-next-line no-unused-vars
                } catch (error) {
                    setErrorMessage("Error al cargar los datos del cliente");
                    setLoading(false);
                }
            };

            loadClientData();
        }
    }, [id]);

    return { loading, errorMessage, client };
};

export const useDistricts = () => {
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadDistricts = async () => {
            try {
                setLoading(true);
                const data = await fetchDistricts();
                setDistricts(data);
                setLoading(false);
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setErrorMessage("Error al cargar los distritos");
                setLoading(false);
            }
        };

        loadDistricts();
    }, []);

    return { districts, loading, errorMessage };
};

export const useSaveClient = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const save = async (id, clientData) => {
        try {
            setLoading(true);
            const response = await saveClient(id, clientData);
            setLoading(false);
            return response;
        } catch (error) {
            setErrorMessage("Error al guardar los datos del cliente");
            setLoading(false);
            throw error;
        }
    };

    return { save, loading, errorMessage };
};
