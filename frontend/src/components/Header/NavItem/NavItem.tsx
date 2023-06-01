import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './NavItem.module.sass';
import ArrowDown from '../../../assets/ArrowDown.svg'

type NavItemProps = {
    title: string;
    links: { label: string, path: string }[];
    paths: string[];
};

export const NavItem: React.FC<NavItemProps> = ({ title, links, paths }) => {
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
                        <a key={index} className="">
                            <Link to={link.path}>{link.label}</Link>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};
