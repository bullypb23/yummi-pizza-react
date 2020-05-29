import React from 'react';
import classes from './Navigation.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const Navigation = () => {
  return (
    <nav className={classes.Navigation}>
      <ul>
        <NavigationItem link="/">Home</NavigationItem>
        <NavigationItem link="/basket">Basket</NavigationItem>
      </ul>
    </nav>
  )
}

export default Navigation;
