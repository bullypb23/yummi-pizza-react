import React, { Component, Suspense } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Basket from './containers/Basket/Basket';

class App extends Component {
  state = {
    selectedPizzas: []
  }

  addedPizzaHandler = (name, price) => {
    console.log(name)
    const updatedState = [...this.state.selectedPizzas];
    updatedState.push({name: name, price: price});
    this.setState({ selectedPizzas: updatedState })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Route exact path="/" render={() => <HomePage addedPizzaHandler={this.addedPizzaHandler} />} />
            <Route path="/basket" component={Basket} />
            <Redirect to="/" />
          </Suspense>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
