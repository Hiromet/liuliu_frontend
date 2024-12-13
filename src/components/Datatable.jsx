import PropTypes from "prop-types";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const DataTable = ({ data, columns, onRowClick, onDeleteClick, noDataMessage = "No data available." }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    return (
        <TableContainer
            component={Paper}
            elevation={3}
            sx={{
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: isDarkMode ? "#1a1a2e" : "#fff",
            }}
        >
            <Table>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: isDarkMode ? "#3f2b5b" : "#d48ef5",
                        }}
                    >
                        {columns.map((header) => (
                            <TableCell
                                key={header}
                                sx={{
                                    fontWeight: "bold",
                                    color: "#fff",
                                    textTransform: "uppercase",
                                }}
                            >
                                {header}
                            </TableCell>
                        ))}
                        <TableCell
                            sx={{
                                fontWeight: "bold",
                                color: "#fff",
                                textTransform: "uppercase",
                            }}
                        >
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <TableRow
                                key={item.id}
                                hover
                                onClick={() => onRowClick(item.id)}
                                sx={{
                                    cursor: "pointer",
                                    backgroundColor: isDarkMode ? "#2a2a3c" : "#fff",
                                    "&:hover": { backgroundColor: isDarkMode ? "#3f3f5a" : "#f1f1f1" },
                                }}
                            >
                                {Object.keys(item).map((field) => (
                                    <TableCell
                                        key={field}
                                        sx={{
                                            color: isDarkMode ? "#e0e0e0" : "#000",
                                            padding: "12px",
                                        }}
                                    >
                                        {item[field] || "N/A"}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteClick(item);
                                        }}
                                        sx={{ backgroundColor: "#ff4d4d", "&:hover": { backgroundColor: "#e63946" } }}
                                    >
                                        <DeleteIcon fontSize="small" sx={{ color: "#fff" }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length + 1} align="center" sx={{ padding: "20px" }}>
                                <Typography variant="body1" color="#d48ef5">
                                    {noDataMessage}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

DataTable.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    onRowClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    noDataMessage: PropTypes.string,
};

export default DataTable;
