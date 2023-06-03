import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SimilarCards.module.sass";
import CardFlip from "react-card-flip";

interface SimilarCard {
    id: number;
    poster: string;
    name: string;
    type: string;
}

export const SimilarCard: React.FC<SimilarCard> = (props) => {
    const { id, poster, name, type } = props;
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const cardClassName = `${styles.CardImage} ${type === "anime" ? styles.AnimeImage : ""}`;

    return (
        <CardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div className={styles.Card} onClick={handleCardClick}>
                <div className={styles.CardImage}>
                    <img src={poster} alt="poster" className={cardClassName} />
                </div>
            </div>

            <div className={styles.Card} onClick={handleCardClick}>
                <div className={styles.CardName}>
                    <Link to={`/${type}/${id}`} className={styles.CardLink}>
                        <a className={styles.CardInfo}>{name}</a>
                    </Link>
                </div>
            </div>
        </CardFlip>
    );
};

interface SimilarCards {
    similar: SimilarCard[];
    type: string;
}

export const SimilarCards: React.FC<SimilarCards> = (props) => {
    const { similar, type } = props;
    const limitedSimilar = similar.slice(0, 10); // Получаем подмассив с максимум 10 элементами

    return (
        <div className={styles.SimilarCards}>
            {limitedSimilar.map((card) => (
                <SimilarCard key={card.id} {...card} type={type} />
            ))}
        </div>
    );
};
