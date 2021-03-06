import React from 'react';
import styles from './Button.module.css';

const Button = (props: any) => {

    return (
        <button
            disabled={props.disabled}
            onClick={props.clicked}
            className={[styles.button, styles[props.size], props.disabled ? styles['disabled'] : null].join(' ')}
        >
            {props.children}
        </button>
    )
}


export default Button;