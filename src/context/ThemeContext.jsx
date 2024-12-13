import { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

// eslint-disable-next-line react/prop-types
export const ThemeContextProvider = ({ children }) => {
    // Set default theme to 'light'
    const [mode, setMode] = useState("light");

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === "dark"
                        ? {
                            background: {
                                default: "#1a1a2e",
                                paper: "#121212",
                            },
                            text: {
                                primary: "#e0e0e0",
                            },
                        }
                        : {
                            background: {
                                default: "#f5f5f5",
                                paper: "#ffffff",
                            },
                            text: {
                                primary: "#000000",
                            },
                        }),
                },
            }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};