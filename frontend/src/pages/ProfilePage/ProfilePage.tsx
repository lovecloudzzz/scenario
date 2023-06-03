import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext, { AuthContextProps } from '../../context/AuthContext';
import styles from './ProfilePage.module.sass';
import SettingsIng from '../../assets/settings.svg';
import {LastRatings} from "./LastRatings/LastRatings";



export const ProfilePage = () => {
    const { user } = useContext(AuthContext) as AuthContextProps;


    let avatar = user?.avatar;
    const username = user?.username;
    const date = user?.registerDate;
    if (avatar === 'false') {
        avatar = 'https://acrohappiness.ru/assets/img/comment.jpg';
    } else {
        avatar = 'http://127.0.0.1:8000' + avatar;
    }

    return (
        <div className={styles.ProfileCol}>
            <div className={styles.Profile}>
                <div className={styles.AvatarRow}>
                    {avatar && <img src={avatar} alt="Avatar" className={styles.AvatarRowImg} />}
                    <div className={styles.AvatarRowSettings}>
                        <Link to={`/user/settings`}>
                            <img src={SettingsIng} alt={'Link to settings'} className={styles.AvatarRowSettingsImg} />
                        </Link>
                        <span className={styles.AvatarRowSettingsDate}>{date}</span>
                    </div>
                </div>
                <div className={styles.ListsRow}>
                    <h1 className={styles.Username}>{username}</h1>
                    <div className={styles.ListsRowType}>
                        <h2 className={styles.ListsRowTypeName}>Аниме</h2>
                        <ul className={styles.ListsRowTypeLists}>
                            <li>
                                <Link to={`/user/${username}/anime/viewed`} className={styles.Link}>
                                    Просмотрено
                                </Link>
                            </li>
                            <li>
                                <Link to={`/user/${username}/anime/planned`} className={styles.Link}>
                                    Запланировано
                                </Link>
                            </li>
                            <li>
                                <Link to={`/user/${username}/anime/dropped`} className={styles.Link}>
                                    Брошено
                                </Link>
                            </li>
                            <li>
                                <Link to={`/user/${username}/anime/deferred`} className={styles.Link}>
                                    Отложено
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.ListsRowType}>
                        <h2 className={styles.ListsRowTypeName}>Фильмы</h2>
                        <ul className={styles.ListsRowTypeLists}>
                            <li>
                                <Link to={`/user/${username}/film/viewed`} className={styles.Link}>
                                    Просмотрено
                                </Link>
                            </li>
                            <li>
                                <Link to={`/user/${username}/film/planned`} className={styles.Link}>
                                    Запланировано
                                </Link>
                            </li>
                            <li>
                                <Link to={`/user/${username}/film/dropped`} className={styles.Link}>
                                    Брошено
                                </Link>
                            </li>
                            <li>
                                <Link to={`/user/${username}/film/deferred`} className={styles.Link}>
                                    Отложено
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.ListsRowType}>
                        <h2 className={styles.ListsRowTypeName}>Сериалы</h2>
                        <ul className={styles.ListsRowTypeLists}>
                            <li>
                                <Link to={`/user/${username}/serial/viewed`} className={styles.Link}>
                                    Просмотрено
                                </Link>
                            </li>
                            <li>
                                <Link to={`/user/${username}/serial/planned`} className={styles.Link}>
                                    Запланировано
                                </Link>
                            </li>
                            <li>
                                <Link to={`/user/${username}/serial/dropped`} className={styles.Link}>
                                    Брошено
                                </Link>
                            </li>
                            <li>
                                <Link to={`/user/${username}/serial/deferred`} className={styles.Link}>
                                    Отложено
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.LastRatings}>
                <LastRatings />
            </div>
        </div>
    );
};
