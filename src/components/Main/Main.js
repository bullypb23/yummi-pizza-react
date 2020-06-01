import React from 'react';
import classes from './Main.module.css';
import logo from '../../assets/logo.png';

const Main = props => {
  return (
    <React.Fragment>
      <div className={classes.Main}>
        <h1 className={classes.MainHeading}>Welcome to Yummi Pizza</h1>
        <p className={classes.MainInfo}>Choose from our menu bellow and order most yummiest pizza in the city!</p>
      </div>
      <div className={classes.Delivery}>
        <div className={classes.Logo}>
          <img src={logo} alt="Yummi Pizza logo" />
        </div>
        <div>
          <h3>Delivery to your adddress in under 30 minutes!</h3>
          <p>Delivery price is 2€! For orders higher than 20€ delivery is free!</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Main;
