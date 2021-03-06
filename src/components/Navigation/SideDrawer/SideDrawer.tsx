import React from 'react';
import Logo from '../../UI/Logo/Logo';
import NavigationList from '../NavigationList/NavigationList';
import styles from './SideDrawer.module.css';

interface SideDrawerProps {
    open: boolean;
}

const SideDrawer = (props: SideDrawerProps) => {

    let toggleClass;

    if(props.open){
        toggleClass = 'open';
    } else {
        toggleClass = 'close';
    }

    return (
        <div className={[styles['side-drawer'], styles[toggleClass]].join(' ')}>
            <nav>
            <Logo></Logo>
            <NavigationList></NavigationList>
            </nav>
        </div>
    )
}

export default SideDrawer;