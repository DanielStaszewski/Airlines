import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../UI/Logo/Logo';
import NavigationList from '../NavigationList/NavigationList';
import Hamburger from '../../UI/Hamburger/Hamburger';

interface ToolbarProps {
    hamburgerClicked(): void;
}

const Toolbar = (props: ToolbarProps) => (
    <header className={styles['toolbar']}>
        <div className={styles["container"]}>
            <Logo></Logo>
            <Hamburger onClicked={props.hamburgerClicked}></Hamburger>
            <nav className={styles['desktop']}>
                <NavigationList></NavigationList>
            </nav>
        </div>
    </header>
);

export default Toolbar;