import React from 'react';
import styles from "./NewCustomList.module.sass"

export const NewCustomList = () => {
    return (
        <form className={styles.CustomListForm}>
            <input type={"text"}/>
            <input type={"image"}/>
            <button className={styles.CustomListFormButton}>Создать</button>
        </form>
    );
};