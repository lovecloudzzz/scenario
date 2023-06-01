import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './CardsPage.module.sass';
import useAxios from '../../utils/useAxios';
import { Pagination } from './Pagination/Pagination';
import { Cards,  CardInterface} from './Cards/Cards';


export const CardsPage = () => {
    const [cardsData, setCardsData] = useState<CardInterface[]>([]);

    const api = useAxios();
    const { page } = useParams<{ page: string }>();
    const location = useLocation();
    const path = location.pathname;

    const regex = /^(\/animes|\/films|\/serials)\//;
    const match = path.match(regex);
    const type = match ? match[1].substring(1) : '';

    let text: string;
    switch (type) {
        case 'animes':
            text = 'anime';
            break;
        case 'films':
            text = 'film';
            break;
        case 'serials':
            text = 'serial';
            break;
        default:
            text = '';
    }

    const getCards = async () => {
        try {
            const response = await api.get(`/${type}/${page}`);

            if (response.status === 200) {
                const cardsData: CardInterface[] = response.data;
                setCardsData(cardsData);
            }
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };

    useEffect(() => {
        getCards();
    }, [type, page]);
    console.log(cardsData)
    return (
        <div className={styles.Page}>
            <Cards cards={cardsData} type={text} />
            <Pagination type={type} currentPage={parseInt(page as string, 10)} />
        </div>
    );
};
