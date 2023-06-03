import React, { useState} from 'react';
import {Link } from 'react-router-dom';
import styles from './NavItem.module.sass';
import ArrowDown from '../../../assets/ArrowDown.svg'

type NavItemProps = {
    title: string;
    links: { label: string, path: string }[];
    paths: string[];
};

export const NavItem: React.FC<NavItemProps> = ({ title, links}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={styles.NavItemDropdown}>
            <button className={styles.NavItemDropdownButton} onClick={handleDropdownToggle}>
                {title}
                <img src={ArrowDown} alt={'Кнопка выподающего списка'} className={styles.NavItemDropdownButtonImg}/>
            </button>
            {isDropdownOpen && (
                <div className={styles.NavItemDropdownContent}>
                    {links.map((link, index) => (
                        <a key={index} className={styles.Link}>
                            <Link to={link.path} >{link.label}</Link>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};
