import React from 'react';
import styles from "./CardTags.module.sass";

interface CardTagsProps{
    tagsArray: string[]
}
export const CardTags: React.FC<CardTagsProps> = (props) => {
    return (
        <div className={styles.Tags}>
            {props.tagsArray.map((tag, index) => (
                <a key={index} className={styles.Tag}>{tag}</a>
            ))}
        </div>
    );
};