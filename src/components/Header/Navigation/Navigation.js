import React from 'react';
import classes from './Navigation.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const Navigation = props => {
  return (
    <nav className={classes.Navigation}>
      <ul>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/basket">
          <i className="fas fa-shopping-cart"></i>
          <span>{props.pizzasNumber > 0 ? '(' + props.pizzasNumber + ')' : null}</span>
        </NavigationItem>
      </ul>
    </nav>
  )
}

export default Navigation;
