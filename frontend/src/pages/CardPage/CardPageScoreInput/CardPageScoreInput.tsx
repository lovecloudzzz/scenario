import React, { useState, useEffect } from 'react';
import useAxios from "../../../utils/useAxios";
import styles from "./CardPageScoreInput.module.sass";

type CardPageScoreInputProps = {
    type: string;
    id: number;
    title: string;
};

export const CardPageScoreInput: React.FC<CardPageScoreInputProps> = ({ type, id, title }) => {
    const api = useAxios();
    const [selectedScore, setSelectedScore] = useState('');
    const [rating, setRating] = useState<number | undefined>(undefined);
    const [isPostRequestMade, setPostRequestMade] = useState(false);

    useEffect(() => {
        const getRating = async () => {
            try {
                const response = await api.get(`/api/user/rating/${type}/${id}/${title}`);
                if (response.status === 200) {
                    const fetchedRating = response.data.rating;
                    setRating(fetchedRating);
                    setSelectedScore(fetchedRating !== undefined ? fetchedRating.toString() : '');
                }
            } catch (error) {
                console.error('Error fetching rating:', error);
            }
        };

        if (!isPostRequestMade) {
            getRating();
        }
    }, [api, type, id, title, isPostRequestMade]);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const score = event.target.value;
        setSelectedScore(score);
        setPostRequestMade(true);

        try {
            const parsedScore = Number(score);
            if (score === '') {
            } else if (!isNaN(parsedScore) && parsedScore >= 1 && parsedScore <= 10) {
                await api.post(`/api/user/rating/${type}/${id}/${title}/${parsedScore}`);
                setPostRequestMade(true);
            } else {
                setSelectedScore('');
            }
        } catch (error) {
        }
    };

    return (
        <div className={styles.CardPageScoreInput}>
            <input
                type="number"
                min="1"
                max="10"
                step="1" // Add this line to ensure the input accepts only integer values
                value={selectedScore}
                onChange={handleInputChange}
                className={styles.Input}
            />
        </div>
    );
};
