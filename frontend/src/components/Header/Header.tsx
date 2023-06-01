import React, {useState, useEffect, useContext} from 'react';
import styles from './Header.module.sass';
import { LoginModal } from '../Modals/LoginModal/LoginModal';
import { RegistrationModal } from '../Modals/RegistrationModal/RegistrationModal';
import { UserAvatar } from "./UserAvatar/UserAvatar";
import { LogoutButton } from "./LogoutButton/LogoutButton";
import { NavItem } from "./NavItem/NavItem";
import { API_URL } from "../../index";
import AuthContext,{AuthContextProps} from "../../context/AuthContext";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
let {user} = useContext(AuthContext) as AuthContextProps
    console.log(user?.avatar)
    return (
        <nav className={styles.Navbar}>
            <div className={styles.NavbarRow}>
                <div className={styles.NavbarRowLogo}>Scénario</div>
                <NavItem title={'Фильмы'} paths={['films', 'film']} links={[{label: "Тайтлы", path: '/films/1'}]}/>
                <NavItem title={'Сериалы'} paths={['serial', 'serials']} links={[{label: "Тайтлы", path: '/serials/1'},{label: "Расписание", path: '/schedule/serial'}]}/>
                <NavItem title={'Аниме'} paths={['anime', 'animes']} links={[{label: "Тайтлы", path: '/animes/1'},{label: "Расписание", path: '/schedule/anime'}]}/>
            </div>
            <div className={styles.NavbarRow}>
                {user ? (
                    <>
                        <UserAvatar image={user.avatar} profileName={user.username}/>
                        <LogoutButton/>
                    </>
                ): (
                    <>
                        <LoginModal/>
                        <RegistrationModal/>
                    </>
                    )}
            </div>
        </nav>
    );
};
