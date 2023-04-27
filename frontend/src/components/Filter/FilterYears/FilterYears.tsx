import React from 'react';
import styles from './FilterYears.module.sass'
export const FilterYears = () => {
    return (
        <div className={styles.FilterYears}>
            <a className={styles.FilterYearsHead}>
                Год релиза:
            </a>
            <div className={styles.FilterYearsMain}>
                <input placeholder={"От года:"}/>
                <input placeholder={"До года:"}/>
            </div>
        </div>
    );
};