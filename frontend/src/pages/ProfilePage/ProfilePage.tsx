import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext, { AuthContextProps } from "../../context/AuthContext";

export const ProfilePage = () => {
    const { user } = useContext(AuthContext) as AuthContextProps;
    let avatar = user?.avatar;
    const username = user?.username;
    if (avatar == 'false') {
        avatar = 'https://acrohappiness.ru/assets/img/comment.jpg'; // Замените на ссылку на изображение по умолчанию или другую ссылку по вашему выбору
    }else {
        avatar = 'http://127.0.0.1:8000'+avatar
    }
    return (
        <div>
            <div>
                <h2>Username: {username}</h2>
                {avatar && <img src={avatar} alt="Avatar" />}
                <a><Link to={`/user/settings`}>Настройки</Link></a>
            </div>
            <div>
                <h2>Anime</h2>
                <ul>
                    <li>
                        <Link to={`/user/${username}/anime/viewed`}>Viewed Anime</Link>
                    </li>
                    <li>
                        <Link to={`/user/${username}/anime/planned`}>Planned Anime</Link>
                    </li>
                    <li>
                        <Link to={`/user/${username}/anime/dropped`}>Dropped Anime</Link>
                    </li>
                    <li>
                        <Link to={`/user/${username}/anime/deferred`}>Deferred Anime</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h2>Films</h2>
                <ul>
                    <li>
                        <Link to={`/${username}/film/viewed`}>Viewed Films</Link>
                    </li>
                    <li>
                        <Link to={`/${username}/film/planned`}>Planned Films</Link>
                    </li>
                    <li>
                        <Link to={`/${username}/film/dropped`}>Dropped Films</Link>
                    </li>
                    <li>
                        <Link to={`/${username}/film/deferred`}>Deferred Films</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h2>Serials</h2>
                <ul>
                    <li>
                        <Link to={`/${username}/serial/viewed`}>Viewed Serials</Link>
                    </li>
                    <li>
                        <Link to={`/${username}/serial/planned`}>Planned Serials</Link>
                    </li>
                    <li>
                        <Link to={`/${username}/serial/dropped`}>Dropped Serials</Link>
                    </li>
                    <li>
                        <Link to={`/${username}/serial/deferred`}>Deferred Serials</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
