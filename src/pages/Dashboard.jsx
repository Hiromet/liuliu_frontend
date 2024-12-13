import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Breadcrumbs,
    Box,
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useThemeContext } from "../context/ThemeContext";
import TokenManager from "../components/TokenManager";
import background from "../images/background.jpg";
import logo from "../images/logo.jpg";

const Dashboard = () => {
    const { mode, toggleTheme } = useThemeContext();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerItems = [
        { text: "Clients", icon: <PeopleIcon />, path: "/dashboard/clients" },
        { text: "Sales", icon: <ShoppingBagIcon />, path: "/dashboard/sales" },
        { text: "Products", icon: <InventoryIcon />, path: "/dashboard/products" },
    ];

    const generateBreadcrumbs = () => {
        const pathnames = location.pathname.split("/").filter((x) => x);
        return (
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link to="/dashboard" style={{ textDecoration: "none", color: mode === "dark" ? "#fff" : "#000", fontWeight: 600 }}>
                    Dashboard
                </Link>
                {pathnames.slice(1).map((value, index) => {
                    const to = `/dashboard/${pathnames.slice(1, index + 2).join("/")}`;
                    return (
                        <Link
                            key={to}
                            to={to}
                            style={{ textDecoration: "none", color: mode === "dark" ? "#ffcccb" : "#ff8f70", fontWeight: 600 }}
                        >
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                        </Link>
                    );
                })}
            </Breadcrumbs>
        );
    };

    const isRootDashboard = location.pathname === "/dashboard";

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundColor: mode === "dark" ? "#1a1a2e" : "#f5f5f5",
                position: "relative",
            }}
        >
            <AppBar position="static" sx={{ background: mode === "dark" ? "#333" : "#d48ef5" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        {generateBreadcrumbs()}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <TokenManager />
                        <IconButton color="inherit" onClick={toggleTheme}>
                            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <List>
                        {drawerItems.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton component={Link} to={item.path}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: mode === "dark" ? "#121212" : "#ffffff", borderRadius: 2, m: 3, boxShadow: 3 }}>
                {isRootDashboard ? (
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            p: 4,
                        }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, color: mode === "dark" ? "#e0e0e0" : "#1a1a2e" }}>
                            Bienvenido al Dashboard de LiuLiú
                        </Typography>
                        <Box component="img" src={logo} alt="Logo" sx={{ width: "150px", height: "150px", borderRadius: "50%", mb: 2 }} />
                        <Typography variant="h6" sx={{ mb: 4, color: mode === "dark" ? "#e0e0e0" : "#1a1a2e" }}>
                            Administra tus clientes, ventas y productos desde aquí.
                        </Typography>
                    </Box>
                ) : (
                    <Outlet />
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
