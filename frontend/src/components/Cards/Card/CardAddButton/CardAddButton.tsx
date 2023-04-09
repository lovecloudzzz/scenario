import React from 'react';
import AddButton from "../assets/AddButtonPlus.svg";
import styles from "./AddButtonPlus.module.sass"

interface CardAddButtonProps{
    listsNames: string[]
}
export const CardAddButton: React.FC<CardAddButtonProps> = (props) => {
    return (
    <div className={styles.Add}>
        <button className={styles.AddButton}><img src={AddButton} alt={"AddButton"}/></button>
        <div className={styles.AddButtonContent}>
            {props.listsNames.map((list, index) => (
                <a key={index}>{list}</a>
            ))}
        </div>
    </div>
    );
};