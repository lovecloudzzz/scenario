import React from 'react';
import styles from './FilterYears.module.sass'
import FilterInput from "../FilterInput/FilterInput";
export const FilterYears = () => {
    return (
        <div className={styles.FilterYears}>
            <a className={styles.FilterYearsHead}>
                Год релиза:
            </a>
            <div className={styles.FilterYearsMain}>
                <FilterInput/>
                <FilterInput/>
            </div>
        </div>
    );
};