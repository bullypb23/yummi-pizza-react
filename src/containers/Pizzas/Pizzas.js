import React, { Component } from 'react';
import classes from './Pizzas.module.css';
import axios from 'axios';
import Pizza from '../../components/Pizza/Pizza';
import Spinner from '../../components/Spinner/Spinner';

class Pizzas extends Component {
  state = {
    pizzas: [],
    url: 'http://localhost/phpsandbox/yummi-pizza/public/api/pizzas',
    isLoaded: false,
  }

  componentDidMount() {
    axios.get(this.state.url)
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
      <div className={classes.PizzasContainer}>
        {items}
      </div>
    )
  }
}

export default Pizzas;