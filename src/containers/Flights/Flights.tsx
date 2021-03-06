import React, { Component } from 'react';
import FlightsList from '../../components/FlightsList/FlightsList';
import Wrap from '../../hoc/Wrap';
import FlightsForm from './FlightsForm/FlightsForm';
import Queue from '../../util/Quene';

//data
const AIRPORTS = ['ATH', 'BSL', 'BFS', 'BLQ', 'BTS', 'BRS', 'CRL', 'BUD', 'DUB', 'EDI', 'EIN', 'GLA', 'HAM', 'CTA', 'KEF', 'CGN', 'SUF', 'LCA', 'LPL', 'LIS', 'LTN', 'STN', 'MAD'];
const CONNECTIONS = [
    ['ATH', 'EDI'],
    ['ATH', 'GLA'],
    ['ATH', 'CTA'],
    ['BFS', 'CGN'],
    ['BFS', 'LTN'],
    ['BFS', 'CTA'],
    ['BTS', 'STN'],
    ['BTS', 'BLQ'],
    ['CRL', 'BLQ'],
    ['CRL', 'BSL'],
    ['CRL', 'LTN'],
    ['DUB', 'LCA'],
    ['LTN', 'DUB'],
    ['LTN', 'MAD'],
    ['LCA', 'HAM'],
    ['EIN', 'BUD'],
    ['EIN', 'MAD'],
    ['HAM', 'BRS'],
    ['KEF', 'LPL'],
    ['KEF', 'CGN'],
    ['SUF', 'LIS'],
    ['SUF', 'BUD'],
    ['SUF', 'STN'],
    ['STN', 'EIN'],
    ['STN', 'HAM'],
    ['STN', 'DUB'],
    ['STN', 'KEF']
]

interface FormData {
    [key: string]: string
}

class Flights extends Component {

    readonly state = {
        airports: AIRPORTS,
        connections: CONNECTIONS,
        formData: {
            start: "",
            destination: ""
        },
        routes: CONNECTIONS,
        loading: false,
        interval: undefined
    }

    flightsFormHandler = (formData: FormData): void => {
        this.setState({loading: true});
        let interval = setTimeout(() => {
            const { start, destination } = formData;
            const routes = this.findRoutes(start, destination);
            console.log(routes);
            this.setState({
                formData: {
                    start: start,
                    destination: destination
                }, 
                routes: routes,
                loading: false,
                interval: interval
            });
        }, 1000);
       
    };

    createGraph(airports: string[]): string[][] {

        const airportsList = [...airports];
        let graph: string[][] = [];

        airportsList.map((airport: string) => {
            const airportConnections: string[] = [];
            this.state.connections.map((connection: string[]) => {
                if (connection[0] === airport) {
                    return airportConnections.push(connection[1]);
                }
                return connection;
            })
            return graph.push(airportConnections);
        })

        return graph;
    }

    isNotVisited(x: string, path: string[]): boolean {
        const size = path.length;
        for (let i = 0; i < size; i++) {
            if (path[i] === x) {
                return false;
            }
        }
        return true;
    }

    findRoutes(start: string, destination: string): string[][] {

        const q = new Queue();
        let path: string[] = [];
        const graph = this.createGraph(this.state.airports);
        const routes: string[][] = [];

        path.push(start);
        q.enqueue(path.slice());

        while (!q.isEmpty()) {
            path = q.dequeue();
            const last = path[path.length - 1];
            if (last === destination) {
                routes.push(path);
            }
            const indexOfLast = this.state.airports.indexOf(last);
            if (!!graph[indexOfLast]) {
                for (let i = 0; i < graph[indexOfLast].length; i++) {
                    if (this.isNotVisited(graph[indexOfLast][i], path)) {
                        let newPath = path.slice();
                        newPath.push(graph[indexOfLast][i]);
                        q.enqueue(newPath);
                    }
                }
            }
        }
        return routes;
    }

    componentWillUnmount(): void{
        if(this.state.interval){
            clearInterval(this.state.interval);
        }
    }

    render(): JSX.Element {
        return (
            <Wrap>
                <FlightsForm airports={this.state.airports} passDataForm={this.flightsFormHandler} />
                <FlightsList loading={this.state.loading} start={this.state.formData.start} destination={this.state.formData.destination} routes={this.state.routes} />
            </Wrap>
        );
    }
}

export default Flights;