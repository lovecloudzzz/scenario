import React, { useEffect, useState } from 'react';
import {useParams, useLocation } from 'react-router-dom';
import styles from './CardPage.module.sass';
import CardPageGenres from './CardPageGenres/CardPageGenres';
import { SimilarCards } from './SimilarCards/SimilarCards';
import { CardPageButton } from './CardPageButton/CardPageButton';
import { CardPageScoreInput } from './CardPageScoreInput/CardPageScoreInput';
import useAxios from '../../utils/useAxios';

export const CardPage = () => {
    const [cardData, setCardData] = useState({
        name: '',
        poster: '',
        score: '',
        year: '',
        rating: '',
        description: '',
        genres: [],
        similar: [],
    });

    const api = useAxios();
    const { id } = useParams<{ id: string | undefined }>();
    const location = useLocation();
    const path = location.pathname;

    const regex = /^(\/anime|\/film|\/serial)\//;
    const match = path.match(regex);
    const type = match ? match[1].substring(1) : '';

    let text;
    switch (type) {
        case 'anime':
            text = 'О аниме';
            break;
        case 'film':
            text = 'О фильме';
            break;
        case 'serial':
            text = 'О сериале';
            break;
        default:
            text = '';
    }

    const getCard = async () => {
        try {
            const response = await api.get(`/${type}/${id}`);

            if (response.status === 200) {
                const cardData = response.data;
                setCardData(cardData);
            }
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };

    useEffect(() => {
        if (id) {
            getCard();
            window.scrollTo(0, 0);
        }
    }, [type, id]);

    const { name, poster, score, year, rating, description, genres, similar } = cardData;

    return (
        <div className={styles.Page}>
            <div className={styles.Head}>
                <div>
                    <div>
                        <img src={poster} className={styles.HeadBanner}  alt={'poster'}/>
                    </div>
                    <div className={styles.HeadTools}>
                        <CardPageButton type={type} id={parseInt(id ?? '0')} title={name} />
                        <CardPageScoreInput id={parseInt(id ?? '0')} title={name} type={type} />
                        <a>{score}</a>
                    </div>
                </div>
                <div className={styles.HeadCard}>
                    <a className={styles.HeadCardTitle}>{name}</a>
                    <a className={styles.HeadCardAbout}>{text}</a>
                    <div className={styles.HeadCardColumnDate}>
                        <a>Дата выхода</a>
                        <a>{year}</a>
                    </div>
                    <div className={styles.HeadCardColumnGenres}>
                        <a>Жанры</a>
                        <CardPageGenres genres={genres} />
                    </div>
                    <div className={styles.HeadCardColumnRating}>
                        <a>Рейтинг</a>
                        <div>{rating}</div>
                    </div>
                    <a className={styles.HeadCardDescription}>Описание</a>
                    <a className={styles.HeadCardDescriptionText}>{description}</a>
                </div>
            </div>
            <div className={styles.Similar}>
                <h1>Может вам понравиться</h1>
                <SimilarCards similar={similar} type={type} />
            </div>
        </div>
    );
};
