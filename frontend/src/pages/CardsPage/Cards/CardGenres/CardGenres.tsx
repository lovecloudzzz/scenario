import React from 'react';
import styles from './CardGenres.module.sass';

type CardPageGenresProps = {
    genres: any[];
};

const CardPageGenres: React.FC<CardPageGenresProps> = ({ genres }) => {
    return (
        <div className={styles.genreContainer}>
            {genres.map((genre, index) => (
                <div key={index} className={styles.genreItem}>{genre}</div>
            ))}
        </div>
    );
};

export default CardPageGenres;
