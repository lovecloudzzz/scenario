import AddButton from "../assets/AddButtonPlus.svg";
import styles from "./AddButtonPlus.module.sass"
import React, { useState } from 'react';
import axios from 'axios';

interface CardAddButtonProps {
    listNames: string[];
}

export const CardAddButton: React.FC<CardAddButtonProps> = ({ listNames }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [requestStatus, setRequestStatus] = useState('');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        sendRequest(option);
    };

    const sendRequest = (option: string) => {
        axios
            .post('/django-api-url', { option })
            .then((response) => {
                // Обработка успешного ответа от сервера
                setRequestStatus(`Запрос отправлен с опцией: ${option}`);
            })
            .catch((error) => {
                // Обработка ошибок
                setRequestStatus('Ошибка при отправке запроса');
            });
    };

    return (
        <div className="CardAddButton">
            <button className="CardAddButtonDropdown" onClick={handleToggle}>
                <img src={AddButton} alt={"Кнопка Добавления"}/>
            </button>
            {isOpen && (
                <ul className="CardAddButtonDropdownContent">
                    {listNames.map((name, index) => (
                        <li
                            key={index}
                            className="dropdown-option"
                            onClick={() => handleOptionSelect(name)}
                        >
                            {name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};