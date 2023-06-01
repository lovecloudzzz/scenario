import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Cards.module.sass";
import CardGenres from "./CardGenres/CardGenres";

export interface CardInterface {
    id: number;
    poster: string;
    name: string;
    type: string;
    genres: string[];

    score: number;
    year: string;
}

export const Card: React.FC<CardInterface> = (props) => {
    const { id, poster, name, type, genres, score, year } = props;
    const [showName, setShowName] = useState(false);

    const handleCardClick = () => {
        setShowName(!showName);
    };
    const cardClassName = `${styles.CardImage} ${type === "anime" ? styles.AnimeCard : ""}`;

    return (
        <div className={styles.Card} onClick={handleCardClick}>
            <div className={cardClassName} style={{ opacity: showName ? 0 : 1 }}>
                <img src={poster} alt={'poster'} className={cardClassName} />
            </div>
            {showName && (
                <div className={styles.CardInfo}>
                    <Link to={`/${type}/${id}`}>
                        <div className={styles.CardInfoName}>{name}</div>
                    </Link>
                    <div className={styles.CardInfoScoreAndYear}>
                        <a>{year}</a>
                        <a>{score}</a>
                    </div>
                    <div className={styles.CardInfoGenres}><CardGenres genres={genres} /></div>
                    <div className={styles.CardInfoDescription}></div>
                </div>
            )}
        </div>
    );
};

interface CardsInterface {
    cards: CardInterface[];
    type: string;
}

export const Cards: React.FC<CardsInterface> = (props) => {
    const { cards, type } = props;

    return (
        <div className={styles.Cards}>
            {cards.map((card) => (
                <Card key={card.id} {...card} type={type} />
            ))}
        </div>
    );
};
