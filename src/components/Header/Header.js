import React from 'react';
import classes from './Header.module.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import Navigation from './Navigation/Navigation';

const Header = props => {
  return (
    <div className={classes.Header}>
      <div className={classes.Logo}>
        <Link to="/">
          <img src={logo} alt="Yummi Pizza Logo"/>
        </Link>
      </div>
      <Navigation pizzasNumber={props.pizzasNumber} />
    </div>
  )
}

export default Header;

