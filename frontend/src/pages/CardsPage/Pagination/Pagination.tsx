// Pagination.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Pagination.module.sass';

interface PaginationProps {
    type: string;
    currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({ type, currentPage}) => {
    const navigate = useNavigate();

    const handlePageChange = (newPage: number) => {
        navigate(`/${type}/${newPage}`);
    };

    const handlePreviousPage = () => {
        handlePageChange(currentPage - 1);
    };

    const handleNextPage = () => {
        handlePageChange(currentPage + 1);
    };

    return (
        <div className={styles.Pagination}>
            {currentPage > 1 && (
                <Link to={`/${type}/${currentPage - 1}`} className={styles.PaginationLink} onClick={handlePreviousPage}>
                    Previous
                </Link>
            )}
            <Link to={`/${type}/${currentPage + 1}`} className={styles.PaginationLink} onClick={handleNextPage}>
                Next
            </Link>
        </div>
    );
};
