import React from 'react';
import classes from './HomePage.module.css';
import Main from '../Main/Main';
import Pizzas from '../../containers/Pizzas/Pizzas';

const HomePage = props => {
  return (
    <div className={classes.HomePage}>
      <Main />
      <Pizzas orderHandler={props.addedPizzaHandler} />
    </div>
  )
}

export default HomePage;
