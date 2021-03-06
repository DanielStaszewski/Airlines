import React from 'react';
import styles from './Hamburger.module.css';

interface HamburgerProps {
    onClicked(): void
}

const Hamburger = (props: HamburgerProps) => {
    return (
        <div onClick={props.onClicked} className={styles['drawer-toggle']}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default Hamburger;