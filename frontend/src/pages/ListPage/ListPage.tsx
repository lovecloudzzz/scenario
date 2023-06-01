import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxios from "../../utils/useAxios";

type ListProps = {
    title: string;
    rating: number;
    url_id: number
};

export const ListPage = () => {
    const [listData, setListData] = useState<ListProps[]>();
    const api = useAxios();

    const { list, type } = useParams<{ list: string, type: string }>();
    let text: string;
    switch (list) {
        case 'planned':
            text = 'Список планируемого';
            break;
        case 'viewed':
            text = 'Список просмотренного';
            break;
        case 'deferred':
            text = 'Список отложенного';
            break;
        case 'dropped':
            text = 'Список брошенного';
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

    useEffect(() => {
        getList();
    }, [type, list]);
console.log(listData)
    return (
        <div>
            {listData && (
                <div>
                    <h2>{text}</h2>
                    <ul>
                        {listData.map((item, index) => (
                            <li key={index}>
                                <Link to={`/${type}/${item.url_id}`}>{item.title}</Link>
                                <span>  Оценка: {item.rating}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
