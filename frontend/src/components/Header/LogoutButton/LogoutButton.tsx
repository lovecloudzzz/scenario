import React, {useContext} from 'react';
import AuthContext, {AuthContextProps} from "../../../context/AuthContext";

export const LogoutButton = () => {
    let {logoutUser} = useContext(AuthContext) as AuthContextProps
    return (
        <button onClick={logoutUser}>Выйти</button>
    );
};
