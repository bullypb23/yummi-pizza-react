import React, { Component } from 'react';
import classes from './Basket.module.css';
import BasketItem from '../../components/BasketItem/BasketItem';
import { Link } from 'react-router-dom';

class Basket extends Component {
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
          <h2>Your shopping cart is empty. Go to <Link to="/">Home</Link> page and choose something from menu.</h2>
        </div>)
    }

    let totalPrice = Number(this.props.totalPrice);

    return (
      <div className={classes.Basket}>
        <div className={classes.Container}>
          <div className={classes.Heading}>
            <h2>Your shopping cart <i className="fas fa-shopping-cart"></i></h2>
          </div>
          {pizzas}
          <div className={classes.Price}>
            <p>Delivery price is {this.props.deliveryPrice}€.</p>
            <h4>Total price is <span>{+totalPrice.toFixed(2) + +this.props.deliveryPrice.toFixed(2)}</span>€</h4>
          </div>
          <div className={classes.Order}>
            <Link to="/order">Order</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Basket;
