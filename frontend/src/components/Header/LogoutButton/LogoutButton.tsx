import React, {useContext} from 'react';
import AuthContext, {AuthContextProps} from "../../../context/AuthContext";
import styles from './LoboutButton.module.sass'
export const LogoutButton = () => {
    let {logoutUser} = useContext(AuthContext) as AuthContextProps
    return (
        <button onClick={logoutUser} className={styles.Button}>Выйти</button>
    );
};
