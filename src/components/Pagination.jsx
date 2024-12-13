import PropTypes from "prop-types";
import { Box, Pagination } from "@mui/material";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleChangePage = (event, newPage) => {
        onPageChange(newPage);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
                showFirstButton
                showLastButton
            />
        </Box>
    );
};

CustomPagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default CustomPagination;
