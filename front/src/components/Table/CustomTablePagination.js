import React from "react";
import {IconButton} from "@material-ui/core";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

function CustomTablePagination(props){
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };


    return (
        <div style={{flexShrink: 0}}>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="next page"
            >
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="previous page">
                <KeyboardArrowRight />
            </IconButton>
        </div>
    );
}

export default CustomTablePagination;
