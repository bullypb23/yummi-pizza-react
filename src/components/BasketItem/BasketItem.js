import React from 'react';
import classes from './BasketItem.module.css';
import pizza from '../../assets/pizza.png';

const BasketItem = props => {
  return (
    <div className={classes.BasketItem}>
      <div className={classes.ImageBox}>
        <img src={pizza} alt="Pizza"/>
      </div>
      <div className={classes.Information}>
        <h2>Pizza: {props.name}</h2>
        <div className={classes.Quantity}>
          <label htmlFor="quantity">Quantity: </label>
          <input 
            type="number" 
            name="quantity" 
            min="1" 
            onChange={(e) => props.quantityHandler(props.id, e.target.value)} 
            id="quantity" 
            placeholder={props.quantity} />
        </div>
        <p>{props.name} price: {props.price}€</p>
      </div>
      <div className={classes.Price}>
        <div onClick={() => props.removePizza(props.id)}>
          <i className="fas fa-trash-alt"></i>
        </div>
        <h4>Price: <span>{Number(props.totalPrice).toFixed(2)}</span>€</h4>
      </div>
    </div>
  )
}

export default BasketItem;
