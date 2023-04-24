import {Card, CardProps} from './Card/Card'
import React from "react";
import styles from "./CardsArray.module.sass"
interface CardArrayProps {
    cards: CardProps[]
}

export const CardArray: React.FC<CardArrayProps> = ({ cards }) => {
    return (
        <div className={styles.CardArray}>
            {cards.map((card, index) => (
                <Card
                    key={index}
                    title={card.title}
                    year={card.year}
                    tags={card.tags}
                    score={card.score}
                    rating={card.rating}
                    img={card.img}
                    listNames={card.listNames}
                />
            ))}
        </div>
    );
};