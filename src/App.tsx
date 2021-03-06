import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import Flights from './containers/Flights/Flights';
import Wrap from './hoc/Wrap';
import { BrowserRouter, Route } from 'react-router-dom';
import ObservedFlights from './containers/ObservedFlights/ObservedFlights';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Wrap>
          <Layout>
            {/* <Flights /> */}
            <Route path="/" exact component={Flights}/>
            <Route path="/observed-flights" component={ObservedFlights}/>
          </Layout>
        </Wrap>
      </BrowserRouter>  
    )
  }
}

export default App;
