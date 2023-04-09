import React from 'react';
import styles from "./SmallNews.module.sass"

interface SmallNewsProps{
    title: string,
    img: string
}
export const SmallNews: React.FC<SmallNewsProps> = (props) => {
    return (
        <div className={styles.SmallNews}>
            <a className={styles.SmallNewsImg} style={{background: props.img}}></a>
            <a className={styles.SmallNewsTitle}>{props.title}</a>
        </div>
    );
};