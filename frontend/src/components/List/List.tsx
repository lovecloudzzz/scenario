import {ListItem, ListItemProps} from "./ListItem/ListItem";
import React from "react";
import styles from "./List.module.sass"

interface ListProps{
    title: string,
    items: ListItemProps[]
}

export const ListItemArray: React.FC<ListProps> = (props) => {
    return (
        <div className={styles.List}>
            <div>{props.title}</div>
            {props.items.map((item, index) => (
                <ListItem
                    key={index}
                    title={item.title}
                    rating={item.rating}
                />
            ))}
        </div>
    );
};