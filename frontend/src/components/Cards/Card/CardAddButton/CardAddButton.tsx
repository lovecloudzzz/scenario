import AddButton from "../assets/AddButtonPlus.svg";
import styles from "./AddButtonPlus.module.sass"
import React, { useState } from 'react';
import axios from 'axios';

interface CardAddButtonProps {
    listsNames: string[];
    item_name: string
}

export const CardAddButton: React.FC<CardAddButtonProps> = ({ listsNames ,item_name}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [requestStatus, setRequestStatus] = useState('');

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        addToList(option, item_name);
    };

    const addToList = (listname: string, item_name: string) => {
        axios
            .post('/add/item', { listname, item_name})
            .then((response) => {
                // Обработка успешного ответа от сервера
                setRequestStatus(`Запрос отправлен с опцией: ${listname}, ${item_name}`);
            })
            .catch((error) => {
                // Обработка ошибок
                setRequestStatus('Ошибка при отправке запроса');
            });
    };

    return (
        <div className="CardAddButton">
            <button className="CardAddButtonDropdown" onClick={handleToggle}>
            </button>
            {isOpen && (
                <ul className="CardAddButtonDropdownContent">
                    {listsNames.map((name, index) => (
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