import React, { useState } from 'react';
import useAxios from "../../../utils/useAxios";
import addButton from '../../../assets/AddButton.svg';

import styles from './CardPageButton.module.sass';

interface CardPageButtonProps {
    id: number;
    title: string;
    type: string;
}

export const CardPageButton: React.FC<CardPageButtonProps> = ({ id, title, type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const api = useAxios();

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = async (listName: string) => {
        try {
            const response = await api.post(`/api/user/add/${type}/${listName}/${id}/${title}`);
            // Handle the response as needed
            console.log(response.data);
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div className={styles.CardPageButton}>
            <button onClick={handleButtonClick} className={styles.Btn}><img src={addButton} alt={'add'} className={styles.Img}/></button>
            {isOpen && (
                <div className={styles.Menu}>
                    <button onClick={() => handleOptionClick('planned')}>Запланировано</button>
                    <button onClick={() => handleOptionClick('viewed')}>Просмотрено</button>
                    <button onClick={() => handleOptionClick('dropped')}>Брошено</button>
                    <button onClick={() => handleOptionClick('deferred')}>Отложено</button>
                </div>
            )}
        </div>
    );
};
