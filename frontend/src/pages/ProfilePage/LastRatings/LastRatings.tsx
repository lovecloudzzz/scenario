import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../../utils/useAxios';
import styles from './LastRatings.module.sass';

interface Rating {
    item_title: string;
    item_type: string;
    item_url_id: string;
    score: number;
}

export const LastRatings: React.FC = () => {
    const [lastRatings, setLastRatings] = useState<Rating[]>([]);
    const api = useAxios();

    useEffect(() => {
        const fetchLastRatings = async () => {
            try {
                const response = await api.get<Rating[]>('/api/user/last-ratings');
                setLastRatings(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLastRatings();
    }, []); // Empty dependency array to run the effect only once

    return (
        <div className={styles.LastRatings}>
            <h2 className={styles.Title}>Последние оценки</h2>
            <ul className={styles.RatingsList}>
                {lastRatings.map((rating, index) => (
                    <li key={index} className={styles.RatingItem}>
                        <Link to={`/${rating.item_type}/${rating.item_url_id}`} className={styles.ItemLink}>
                            {rating.item_title}
                        </Link>
                        <span className={styles.Score}>{rating.score}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
