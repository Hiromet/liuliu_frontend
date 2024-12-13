import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeContextProvider } from "./context/ThemeContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Sales from "./pages/Sales";
import Products from "./pages/Products";
import Client from "./components/Client";
import Product from "./components/Product";

const App = () => {
    const accessToken = localStorage.getItem("access_token");

    return (
        <Routes>
            <Route path="/" element={<Navigate to={accessToken ? "/dashboard" : "/login"} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />}>
                <Route path="clients" element={<Clients />} />
                <Route path="clients/add" element={<Client />} />
                <Route path="client/:id/edit" element={<Client />} />
                <Route path="sales" element={<Sales />} />
                <Route path="products" element={<Products />} />
                <Route path="products/add" element={<Product />} />
                <Route path="products/:id/edit" element={<Product />} />
            </Route>
        </Routes>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeContextProvider>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </ThemeContextProvider>
);
