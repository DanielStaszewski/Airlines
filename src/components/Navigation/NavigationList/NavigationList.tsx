import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationList.module.css';

const NavigationList = () => {
    return (
        <ul className={styles['navigation-items']}>
            <li className={styles['navigation-item']}>
                <NavLink exact to="/" activeClassName={styles.active}>Start</NavLink>
            </li>
            <li className={styles['navigation-item']}>
                <NavLink exact to="/observed-flights" activeClassName={styles.active}>Observed Flights</NavLink>
            </li>
        </ul>
    );
}

export default NavigationList;