import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RefreshIcon from "@mui/icons-material/Refresh";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const TokenManager = () => {
    const [timeLeft, setTimeLeft] = useState(0);
    const navigate = useNavigate();

    const calculateTimeLeft = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login");
            return 0;
        }
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        return Math.max((expirationTime - currentTime) / 1000, 0);
    };

    const refreshToken = async () => {
        try {
            const response = await axios.post(`${BASE_API_URL}/auth/refresh/`, {
                refresh: localStorage.getItem("refresh_token"),
            });
            localStorage.setItem("access_token", response.data.access);
            setTimeLeft(calculateTimeLeft());
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            alert("Failed to refresh token. Please log in again.");
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/login");
        }
    };

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                const newTime = prev - 1;
                if (newTime <= 0) {
                    clearInterval(interval);
                    alert("Token expired! Please log in again.");
                    navigate("/login");
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTimeIcon sx={{ color: "#5a2e8a" }} />
                <Typography variant="body2" sx={{ color: "#fff", fontWeight: "bold" }}>
                    {formatTime(timeLeft)}
                </Typography>
            </Box>
            <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={refreshToken}
                sx={{
                    backgroundColor: "#6a1b9a",
                    "&:hover": {
                        backgroundColor: "#4a148c",
                    },
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "#fff",
                }}
            >
                Refresh
            </Button>
        </Stack>
    );
};

export default TokenManager;
