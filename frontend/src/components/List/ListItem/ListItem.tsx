import React from 'react';
import styles from "./ListItem.module.sass"
import DeleteButton from "../assets/DeleteButton.svg";
interface ListItemProps{
    title: string,
    rating: number
}

export const ListItem: React.FC<ListItemProps> = (props) => {
    return (
        <div className={styles.ListItem}>
            <a className={styles.ListItemTitle}>{props.title}</a>
            <div className={styles.ListItemEnd}>
                <a className={styles.ListItemEndRating}>{props.rating}</a>
                <button className={styles.ListItemEndButton}><img src={DeleteButton} alt={"DeleteButton"}/></button>
            </div>
        </div>
    );
};