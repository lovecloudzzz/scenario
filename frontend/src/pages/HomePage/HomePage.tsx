import React from 'react';
import Slider from "../../components/Slider/Slider";
import styles from "./HomePage.module.sass";
export const HomePage = () => {
    return (
        <div className={styles.home}>
            <Slider/>
        </div>
    );
};