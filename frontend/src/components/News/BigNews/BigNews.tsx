import React from 'react';
import styles from "./BigNews.module.sass"

interface BigNewsProps{
    title: string,
    img: string,
    description: string
}
export const BigNews: React.FC<BigNewsProps> = (props) => {
    return (
        <div className={styles.BigNews}>
            <a className={styles.BigNewsImg} style={{background: props.img}}></a>
            <a className={styles.BigNewsTextTitle}>{props.title}</a>
            <a className={styles.BigNewsTextDescription}>{props.description}</a>
        </div>
    );
};