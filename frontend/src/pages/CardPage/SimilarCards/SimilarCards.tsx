import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SimilarCards.module.sass";

interface SimilarCard {
    id: number;
    poster: string;
    name: string;
    type: string;
}

export const SimilarCard: React.FC<SimilarCard> = (props) => {
    const { id, poster, name, type } = props;
    const [showName, setShowName] = useState(false);

    const handleCardClick = () => {
        setShowName(!showName);
    };

    return (
        <div className={styles.Card} onClick={handleCardClick}>
            <div
                className={styles.CardImage}
                style={{ background: poster, opacity: showName ? 0 : 1 }}
            >
                <img src={poster} alt={'poster'}/>
            </div>
            {showName && (
                <Link to={`/${type}/${id}`}>
                <div className={styles.CardName}>
                    <a className={styles.CardInfo}>
                        {name}
                    </a>
                </div>
                </Link>
            )}
        </div>
    );
};

interface SimilarCards {
    similar: SimilarCard[];
    type: string;
}

export const SimilarCards: React.FC<SimilarCards> = (props) => {
    const { similar, type } = props;

    return (
        <div className={styles.SimilarCards}>
            {similar.map((card) => (
                <SimilarCard key={card.id} {...card} type={type} />
            ))}
        </div>
    );
};
