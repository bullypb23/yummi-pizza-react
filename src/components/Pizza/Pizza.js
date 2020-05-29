import React, { useState } from 'react';
import classes from './Pizza.module.css';
import peperoni from '../../assets/pepperoni.png';
import capricciosa from '../../assets/capricciosa.png';
import vegetariana from '../../assets/vegetariana.png';
import hawaiian from '../../assets/hawaiian.png';
import mexicana from '../../assets/mexicana.png';
import quattro from '../../assets/quattro.png';

const Pizza = props => {
  const [price, setPrice] = useState(props.priceS);

  const sizeHandler = (e) => {
    setPrice(e.target.value)
  }

  let src;

  switch(props.name) {
    case 'Peperoni':
      src = peperoni;
      break;
    case 'Capricciosa':
      src = capricciosa;
      break;
    case 'Vegetariana':
      src = vegetariana;
      break;
    case 'Hawaii':
      src = hawaiian;
      break;
    case 'Mexicana':
      src = mexicana;
      break;
    case 'Quattro formaggi':
      src = quattro;
      break;
    default:
      src = peperoni
  }

  return (
    <div className={classes.PizzaItem}>
      <div className={classes.ImageContainer}>
        <img className={classes.PizzaImage} src={src} alt='Margarita'/>
        <div className={classes.Description}>
          <p>Ingredients</p>
          <p>{props.ingredients}</p>
        </div>
      </div>
      <h3>{props.name}</h3>
      <div className={classes.SelectForm}>
        <select name="size" id="size" onChange={sizeHandler}>
          <option value={props.priceS}>S 27cm - {props.priceS} €</option>
          <option value={props.priceL}>L 32cm - {props.priceL} €</option>
          <option value={props.priceXL}>XL 42cm - {props.priceXL} €</option>
        </select>
      </div>
      <button onClick={() => props.orderHandler(props.name, price)}>Add to Basket</button>
    </div>
  )
}

export default Pizza;
