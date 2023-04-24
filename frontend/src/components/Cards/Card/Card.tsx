import React from 'react';
import {CardTags} from "./CardTags/CardTags";
import {CardAddButton} from "./CardAddButton/CardAddButton";
import styles from "./Card.module.sass"

export interface CardProps {
    title: string,
    year: number,
    tags: string[],
    score: number,
    rating: string,
    img: string,
    listNames: string[],

}

export const Card: React.FC<CardProps> = (props) => {
    return (
        <div className={styles.Card} style={{background: props.img}}>
            <div className={styles.CardInfo}>
              <div className={styles.CardHeader}>
                  <a className={styles.CardHeaderTitle}>{props.title}</a>
                  <a className={styles.CardHeaderYear}>{props.year}</a>
                  <CardTags tagsArray={props.tags}/>
              </div>
              <div className={styles.CardFooter}>
                  <a>{props.rating}</a>
                  <a>{props.score}</a>
                  <CardAddButton listsNames={props.listNames}/>
              </div>
            </div>
        </div>
    );
};