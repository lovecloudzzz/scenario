import React, {useContext} from 'react';
import styles from './Header.module.sass';
import { LoginModal } from '../Modals/LoginModal/LoginModal';
import { RegistrationModal } from '../Modals/RegistrationModal/RegistrationModal';
import { UserAvatar } from "./UserAvatar/UserAvatar";
import { LogoutButton } from "./LogoutButton/LogoutButton";
import { NavItem } from "./NavItem/NavItem";
import AuthContext,{AuthContextProps} from "../../context/AuthContext";
import {Link} from "react-router-dom";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
let {user} = useContext(AuthContext) as AuthContextProps
    console.log(user?.avatar)
    return (
        <nav className={styles.Navbar}>
            <div className={styles.NavbarRow}>
                <Link to={'/'} className={styles.Link}><div className={styles.NavbarRowLogo}>Scénario</div></Link>
                <NavItem title={'Фильмы'} paths={['films', 'film']} links={[{label: "Тайтлы", path: '/films/1'}]}/>
                <NavItem title={'Сериалы'} paths={['serial', 'serials']} links={[{label: "Тайтлы", path: '/serials/1'}]}/>
                <NavItem title={'Аниме'} paths={['anime', 'animes']} links={[{label: "Тайтлы", path: '/animes/1'}]}/>
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
