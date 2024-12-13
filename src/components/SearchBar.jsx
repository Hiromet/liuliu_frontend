import { useState } from "react";
import PropTypes from "prop-types";
import { Box, TextField } from "@mui/material";

const SearchBar = ({ searchTerm, onSearch }) => {
    const [inputValue, setInputValue] = useState(searchTerm);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (onSearch) {
            clearTimeout(window.searchTimeout);
            window.searchTimeout = setTimeout(() => {
                onSearch(value);
            }, 500);
        }
    };

    return (
        <Box sx={{ marginBottom: 2, width: "100%", maxWidth: 400 }}>
            <TextField
                fullWidth
                label="Search clients..."
                variant="outlined"
                size="small"
                value={inputValue}
                onChange={handleChange}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#d48ef5",
                        },
                        "&:hover fieldset": {
                            borderColor: "#ff8f70",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#d48ef5",
                        },
                    },
                    "& .MuiInputBase-input": {
                        fontSize: "0.9rem",
                    },
                }}
            />
        </Box>
    );
};

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
