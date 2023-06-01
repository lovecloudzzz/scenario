import React, { useState } from 'react';
import useAxios from "../../../utils/useAxios";
import styles from "./CardPageScoreButton.module.sass";

type CardPageScoreButtonProps = {
    type: string;
    id: number;
    title: string;
};

export const CardPageScoreButton: React.FC<CardPageScoreButtonProps> = ({ type, id, title }) => {
    const api = useAxios();
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedScore, setSelectedScore] = useState('');

    const handleButtonClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleScoreSelect = async (score: number) => {
        try {
            await api.post(`/api/user/rating/${type}/${id}/${title}/${score}`);
            // Ваша логика после успешной отправки запроса
        } catch (error) {
            // Обработка ошибки
        }
        setSelectedScore(score.toString());
        setShowDropdown(false);
    };

    return (
        <div className={styles.CardPageButton}>
            <button onClick={handleButtonClick} className={styles.Btn}>
                <a className={styles.A}>{selectedScore || 'Оценка'}</a>
            </button>
            {showDropdown && (
                <div className={styles.Menu}>
                    {[...Array(10)].map((_, index) => (
                        <button key={index} onClick={() => handleScoreSelect(index + 1)} className={styles.ScoreButton}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
