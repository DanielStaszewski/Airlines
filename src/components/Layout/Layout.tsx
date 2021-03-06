import React, { Component } from 'react';
import Wrap from '../../hoc/Wrap';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import styles from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {

    readonly state = {
        showSideDrawer: false
    }

    toggleSideDrawer = (): void => {
        this.setState((prevState: {showSideDrawer: boolean}) => {
            return {showSideDrawer : !prevState.showSideDrawer}
        });
    }

    render(): JSX.Element {
        return (<Wrap>
            <Toolbar hamburgerClicked={this.toggleSideDrawer}/>
            <SideDrawer open={this.state.showSideDrawer}/>
            <main className={styles.main}>
                {this.props.children}
            </main>
            <footer className={styles['footer']}>Daniel Staszewski 2021</footer>
        </Wrap>
        )
    }
}

export default Layout;