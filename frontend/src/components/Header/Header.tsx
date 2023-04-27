import React from 'react';
import {NavItem} from "./NavItem/NavItem";

export const Header = () => {
    return (
        <nav>
            <div>
                <NavItem/>
                <NavItem/>
                <NavItem/>
                <NavItem/>
            </div>
            <div>
                <NavItem/>
                <NavItem/>
            </div>
        </nav>
    );
};