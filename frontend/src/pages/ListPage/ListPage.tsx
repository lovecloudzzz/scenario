import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxios from '../../utils/useAxios';
import styles from './ListPage.module.sass';
import DeleteButton from '../../assets/DeleteButton.svg';
import {CardPageScoreInput} from "../CardPage/CardPageScoreInput/CardPageScoreInput";

type ListProps = {
    title: string;
    rating: number | undefined;
    url_id: number;
};

export const ListPage = () => {
    const [listData, setListData] = useState<ListProps[]>();
    const api = useAxios();

    const { list, type } = useParams<{ list: any; type: any }>();

    let text: string;
    switch (list) {
        case 'planned':
            text = 'Запланировано';
            break;
        case 'viewed':
            text = 'Просмотрено';
            break;
        case 'deferred':
            text = 'Отложено';
            break;
        case 'dropped':
            text = 'Брошено';
            break;
        default:
            text = '';
    }

    const getList = async () => {
        try {
            const response = await api.get(`/api/user/list/${type}/${list}`);

            if (response.status === 200) {
                const listData: ListProps[] = response.data;
                setListData(listData);
            }
        } catch (error) {
            console.error('Error fetching card data:', error);
        }
    };

    const deleteListItem = async (url_id: number) => {
        try {
            const response = await api.post(`/api/user/delete/${type}/${list}/${url_id}`);
            if (response.status === 200) {
                getList();
            }
        } catch (error) {
            console.error('Error deleting list item:', error);
        }
    };


    useEffect(() => {
        getList();
    }, [type, list]);

    return (
        <div>
            {listData && (
                <div className={styles.List}>
                    <a className={styles.ListName}>{text}</a>
                    <ul className={styles.ListItems}>
                        {listData.map((item, index) => (
                            <li key={index} className={styles.ListItemsItem}>
                                <Link to={`/${type}/${item.url_id}`} className={styles.Link}>
                                    {item.title}
                                </Link>
                                <div className={styles.ListItemsItemRight}>
                                    <CardPageScoreInput type={type} id={item.url_id} title={item.title} />
                                    <button
                                        className={styles.ListItemsItemRightButton}
                                        onClick={() => deleteListItem(item.url_id)}
                                    >
                                        <img
                                            className={styles.ListItemsItemRightButtonImg}
                                            src={DeleteButton}
                                            alt={`Удалить ${item.title} из списка`}
                                        />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ListPage;
