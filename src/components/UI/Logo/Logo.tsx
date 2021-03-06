import React from 'react';
import styles from './Logo.module.css';

const Logo = () => (
    <div className={styles.logo}>
        <h1 className={styles['logo-heading']}>Airlines</h1>
    </div>
)

export default Logo;