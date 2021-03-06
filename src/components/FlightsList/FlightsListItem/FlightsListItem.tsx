import React from 'react';
import styles from './FlightsListItem.module.css';
import Button from '../../UI/Button/Button';
import Wrap from '../../../hoc/Wrap';

interface FlightsListItemProps {
    id: number
    route: string[]
}

const FlightsListItem = (props: FlightsListItemProps) => {


    return (
        <li className={styles["flights-list-item"]} key={props.id}>
            <div>
                <header className={styles["main-info"]}>
                    <h2 className={styles['list-item-title']}>{props.route[0]}</h2>
                    <div className={styles['line']}></div>
                    <h2 className={styles['list-item-title']}>{props.route[props.route.length - 1]}</h2>
                    <span className={styles['list-item-connections']}>Transfers: {props.route.length - 2}</span>
                </header>
                <div className={styles['additional-info']}>
                    <h4 className={styles["route-heading"]}>Route:</h4>
                    {props.route.map((airport: string, index: number) => {
                        if (index === props.route.length - 1) return <span className={styles["route-item"]}>{airport}</span>;
                        return (
                            <Wrap>
                                <span className={styles["route-item"]}>{airport}</span>
                                <span className={styles["arrow"]}>&gt;</span>
                            </Wrap>);
                    })}
                </div>
            </div>
            <div>
                <h3 className={styles["price"]}>{Math.floor(Math.random() * (600 - 300) + 300)}$</h3>
                <span className={styles["price-info"]}>one-way ticket for one person</span>
                <Button>Observe</Button>
            </div>
        </li>
    )
}

export default FlightsListItem;