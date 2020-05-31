import React from 'react';
import classes from './CompletedOrder.module.css';
import Step from '../Step/Step';

const CompletedOrder = props => {
  const goToHomePage = () => {
    props.history.push('/');
    window.location.reload();
  }
  return (
    <div className={classes.CompletedOrder}>
      <div className={classes.Steps}>
        <Step active><i className="fas fa-utensils"></i></Step>
        <Step active><i className="fas fa-shopping-cart"></i></Step>
        <Step active><i className="fas fa-user"></i></Step>
        <Step active><i className="fas fa-truck"></i></Step>
      </div>
      <div className={classes.Success}>
        <h2>You successfully completed order!</h2>
        <p>Expect us on your door in less than 30 minutes! Hope you enjoy your meal :)</p>
        <p>Go back to <span onClick={goToHomePage}>Home</span> page.</p>
      </div>
    </div>
  )
}

export default CompletedOrder;
