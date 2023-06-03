import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserAvatar.module.sass';

type UserAvatarProps = {
    image: string;
    profileName: string;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({ image, profileName }) => {
    let imageUrl = image;
    if (imageUrl == 'false') {
        imageUrl = 'https://acrohappiness.ru/assets/img/comment.jpg'; // Замените на ссылку на изображение по умолчанию или другую ссылку по вашему выбору
    }else {
        imageUrl = 'http://127.0.0.1:8000'+imageUrl
    }
    return (
        <Link to={`/user/${profileName}`} className={styles.Link}>
            <div className={styles.UserAvatar}>
                <a className={styles.UserAvatarNick}>{profileName}</a>
                <img src={imageUrl} alt="User Avatar" className={styles.UserAvatarImg} />
            </div>
        </Link>
    );
};
