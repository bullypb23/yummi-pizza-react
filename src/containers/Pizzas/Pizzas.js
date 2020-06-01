import React, { Component } from 'react';
import classes from './Pizzas.module.css';
import axios from 'axios';
import Pizza from '../../components/Pizza/Pizza';
import Spinner from '../../components/Spinner/Spinner';
import Step from '../../components/Step/Step';
import { API_PIZZAS } from '../../shared/utility';

class Pizzas extends Component {
  state = {
    pizzas: [],
    isLoaded: false
  }

  componentDidMount() {
    axios.get(API_PIZZAS)
      .then(response => {
        this.setState({pizzas: response.data, isLoaded: true})
      })
  }

  orderHandler = (name, size) => {
    console.log(name, size);
  }

  render() {
    const pizzas = this.state.pizzas;
    let items = <Spinner />;
    if(this.state.isLoaded) {
      items = Object.keys(pizzas).map(key => {
        return <Pizza 
                  key={key}
                  name={pizzas[key].name}
                  ingredients={pizzas[key].ingredients}
                  priceS={pizzas[key].priceS}
                  priceL={pizzas[key].priceL}
                  priceXL={pizzas[key].priceXL}
                  orderHandler={this.props.orderHandler} />
      }) 
    } 
    return (
      <div className={classes.Pizzas}>
        <div className={classes.Steps}>
          <Step active><i className="fas fa-utensils"></i></Step>
          <Step><i className="fas fa-shopping-cart"></i></Step>
          <Step><i className="fas fa-user"></i></Step>
          <Step><i className="fas fa-truck"></i></Step>
        </div>
        <div className={classes.PizzasContainer}>
          {items}
        </div>
      </div>
    )
  }
}

export default Pizzas;
