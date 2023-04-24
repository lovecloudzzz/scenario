import React from 'react';
import DeleteButton from "../assets/DeleteButton.svg";
import styles from "./CustomList.module.sass"

interface CustomListProps{
    imgLink: string,
    title: string
}
export const CustomList: React.FC<CustomListProps> = (props) => {
    return (
        <div className={styles.CustomList}>
            <div className={styles.CustomListHead}>
                <img src={props.imgLink} alt={"Img"} className={styles.CustomListHeadBanner}/>
                <button className={styles.CustomListHeadDeleteButton}><img src={DeleteButton} alt={"Delete"} /></button>
            </div>
            <a>
                {props.title}
            </a>
        </div>
    );
};