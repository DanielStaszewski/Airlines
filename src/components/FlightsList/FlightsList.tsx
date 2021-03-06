import React from 'react';
import styles from './FlightsList.module.css'
import FlightsListItem from './FlightsListItem/FlightsListItem';
import Spinner from '../UI/Spinner/Spinner';

interface FlightsListProps {
    start: string;
    destination: string;
    routes: string[][];
    loading: boolean;
}

const FlightsList = (props: FlightsListProps) => {

    let content;
    let id = 0;

    if (props.loading) {

        content = (
            <ul className={styles['flights-list--center']}>
                <Spinner key="spinner" />
            </ul>)
    } else if (props.routes.length === 0) {
        content = (
            <ul className={styles['flights-list--center']}>
                <h2 key="noflights" className={styles['no-flights-header']}>No flights available.</h2>
            </ul>
        )
    } else {
        content = (
            <ul className={styles['flights-list']}>
                {
                    props.routes.map((route: string[]) => {
                        id++;
                        return <FlightsListItem route={route} id={id} />
                    })
                }
            </ul>
        )
    }

    return (
        <section className={styles['flights']}>
            <h1 className={styles["flights-list-title"]}>List of flights:</h1>
            <hr />
            {content}
        </section>
    );

}

export default FlightsList;