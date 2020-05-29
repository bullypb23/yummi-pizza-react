import React from 'react';
import classes from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.Navigation}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/basket">Basket</Link></li>
        </ul>
      </div>
      <div className={classes.SocialMedia}>
        <div>
          <h3>Follow Us</h3>
        </div>
        <div className={classes.SocialMediaIconsContainer}>
          <div className={classes.Icon}><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></div>
          <div className={classes.Icon}><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></div>
        </div>
      </div>
      <div className={classes.Copyright}>
        <p>Copyright Yummi Pizza© 2020</p>
      </div>
    </footer>
  )
}

export default Footer;
