import React from 'react';
import styles from "./CustomListsCategories.module.sass"

export const CustomListsCategories = () => {
    return (
        <div className={styles.CustomListsCategories}>
            <a className={styles.CustomListsCategoriesTitle}>Кастомные списки:</a>
            <a>Фильмы</a>
            <a>Сериалы</a>
            <a>Аниме</a>
        </div>
    );
};