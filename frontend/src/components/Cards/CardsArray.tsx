import {Card, CardProps} from './Card/Card'
import React from "react";
import styles from "./CardsArray.module.sass"
interface CardArrayProps {
    cards: CardProps[]
    list_names: string[]
}

export const CardArray: React.FC<CardArrayProps> = ({ cards ,list_names}) => {
    return (
        <div className={styles.CardArray}>
            {cards.map((card, index,) => (
                <Card
                    key={index}
                    title={card.title}
                    year={card.year}
                    tags={card.tags}
                    score={card.score}
                    rating={card.rating}
                    img={card.img}
                    listNames={list_names}
                />
            ))}
        </div>
    );
};