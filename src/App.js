import React, { Component, Suspense } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import Basket from './containers/Basket/Basket';
import Order from './containers/Order/Order';

class App extends Component {
  state = {
    selectedPizzas: [],
    totalBasketPrice: 0,
    deliveryPrice: 2
  }

  addedPizzaHandler = (name, price) => {
    const updatedBasket = [...this.state.selectedPizzas];
    let quantity = 1;
    updatedBasket.push({name: name, price: price, quantity: quantity, totalPrice: price});
    this.setState({ selectedPizzas: updatedBasket });
    this.setState(prevState => {
      return {
        totalBasketPrice: prevState.totalBasketPrice + Number(price)
      }
    });
    let newDeliveryPrice = 0;
    this.setState(prevState => {
      prevState.totalBasketPrice < 20 ? newDeliveryPrice = 2 : newDeliveryPrice = 0;
      return {
        deliveryPrice: newDeliveryPrice
      }
    });
  }

  quantityHandler = (id, quantity) => {
    let updatedBasket = [...this.state.selectedPizzas];
    let updatedBasketId = updatedBasket[id];
    updatedBasketId.quantity = +quantity;
    updatedBasketId.totalPrice = +updatedBasketId.price * +updatedBasketId.quantity;
    updatedBasket[id] = updatedBasketId;
    this.setState({ 
      selectedPizzas: updatedBasket,
    });
    let newPrice = 0;
    for(let i = 0; i < updatedBasket.length; i++) {
      newPrice += Number(updatedBasket[i].totalPrice)
    }
    this.setState({ totalBasketPrice: newPrice });
    let newDeliveryPrice = 0;
    this.setState(prevState => {
      prevState.totalBasketPrice < 20 ? newDeliveryPrice = 2 : newDeliveryPrice = 0;
      return {
        deliveryPrice: newDeliveryPrice
      }
    });
  }

  removePizzaHandler = (id) => {
    let updatedBasket = [...this.state.selectedPizzas];
		let updatedBasketIDs = updatedBasket.filter((item, index) => {
			return index !== Number(id)
		});
		this.setState({
			selectedPizzas: updatedBasketIDs
		});
		this.setState(prevState => {
			return {
				totalBasketPrice: prevState.totalBasketPrice - Number(updatedBasket[id].price)
			}
    });
    let newDeliveryPrice = 0;
    this.setState(prevState => {
      prevState.totalBasketPrice < 20 ? newDeliveryPrice = 2 : newDeliveryPrice = 0;
      return {
        deliveryPrice: newDeliveryPrice
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Header pizzasNumber={this.state.selectedPizzas.length} />
        <Switch>
          <Suspense fallback={<h1>Loading...</h1>}>
            <Route exact path="/" render={() => <HomePage addedPizzaHandler={this.addedPizzaHandler} />} />
            <Route path="/basket" render={() => <Basket 
                                                  pizzas={this.state.selectedPizzas} 
                                                  totalPrice={this.state.totalBasketPrice} 
                                                  quantityHandler={this.quantityHandler} 
                                                  removePizza={this.removePizzaHandler}
                                                  deliveryPrice={this.state.deliveryPrice}
                                                  {...this.props} />} />
            <Route path="/order" render={() => <Order 
                                                  deliveryPrice={this.state.deliveryPrice}
                                                  pizzas={this.state.selectedPizzas} 
                                                  totalPrice={this.state.totalBasketPrice}
                                                  {...this.props} />} />
            <Redirect to="/" />
          </Suspense>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);