import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Pagination.module.sass';
import next from '../../../assets/next.svg'
import prev from '../../../assets/prev.svg'


interface PaginationProps {
    type: string;
    currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({ type, currentPage }) => {
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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутка страницы вверх при изменении страницы
    }, [currentPage]);

    return (
        <div className={styles.Pagination}>
            {currentPage > 1 && (
                <Link
                    to={`/${type}/${currentPage - 1}`}
                    className={styles.PaginationLink}
                    onClick={handlePreviousPage}
                >
                    <img src={prev} alt={'prev'} className={styles.Img}/>
                </Link>
            )}
            <Link to={`/${type}/${currentPage + 1}`} className={styles.PaginationLink} onClick={handleNextPage}>
                <img src={next} alt={'next'} className={styles.Img}/>
            </Link>
        </div>
    );
};
