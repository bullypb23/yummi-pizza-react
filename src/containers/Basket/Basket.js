import React, { Component } from 'react';
import classes from './Basket.module.css';
import BasketItem from '../../components/BasketItem/BasketItem';
import { Link } from 'react-router-dom';
import Step from '../../components/Step/Step';
import axios from 'axios';

class Basket extends Component {
  state = {
    converter: null,
    message: null
  }

  componentDidMount() {
    axios.get('https://api.exchangeratesapi.io/latest')
      .then(response => {
        this.setState({ converter: response.data.rates.USD })
        console.log(response.data.rates.USD)
      }).catch(err => {
        this.setState({ message: 'We have problem with converting to USD'})
      })
  }
  goToOrders = () => {
    this.props.history.push('/orders');
  }
  render() {
    const pizzasArray = Object.keys(this.props.pizzas);
    let pizzas = null;

    if(pizzasArray.length !== 0) {
      pizzas = Object.keys(this.props.pizzas).map(key => {
        return (
          <BasketItem
            key={key}
            id={key}
            price={this.props.pizzas[key].price}
            name={this.props.pizzas[key].name}
            totalPrice={this.props.pizzas[key].totalPrice}
            quantity={this.props.pizzas[key].quantity}
            quantityHandler={this.props.quantityHandler}
            removePizza={this.props.removePizza}   
          />
        )
      })
    } else {
      pizzas = (
        <div className={classes.EmptyBasket}>
          <h2>Your shopping cart is empty. Go to <Link to="/">Home</Link> page and choose something yummi!</h2>
        </div>)
    }

    let totalPrice = Number(this.props.totalPrice);
    let dollarsPrice = totalPrice.toFixed(2) * this.state.converter;

    return (
      <div className={classes.Basket}>
        <div className={classes.Steps}>
          <Step active><i className="fas fa-utensils"></i></Step>
          <Step active><i className="fas fa-shopping-cart"></i></Step>
          <Step><i className="fas fa-user"></i></Step>
          <Step><i className="fas fa-truck"></i></Step>
        </div>
        <div className={classes.Container}>
          <div className={classes.Heading}>
            <h2>Your shopping cart <i className="fas fa-shopping-cart"></i></h2>
          </div>
          {pizzas}
          {pizzasArray.length !== 0 ? (
            <React.Fragment>
              <div className={classes.Price}>
                <p>Delivery price is {this.props.deliveryPrice}€.</p>
                <h4>Total price is <span>{+totalPrice.toFixed(2)}</span>€</h4>
                <p>Price in USD is {+dollarsPrice.toFixed(2)}$</p>
              </div>
              <div className={classes.Order}>
                <button onClick={this.goToOrders} disabled={pizzasArray.length === 0 ? true : false}>Order</button>
              </div>
            </React.Fragment>
          ) : null}
          
        </div>
      </div>
    )
  }
}

export default Basket;
