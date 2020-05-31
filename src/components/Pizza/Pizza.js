import React, { useState, useEffect } from 'react';
import classes from './Pizza.module.css';
import peperoni from '../../assets/pepperoni.png';
import capricciosa from '../../assets/capricciosa.png';
import vegetariana from '../../assets/vegetariana.png';
import hawaiian from '../../assets/hawaiian.png';
import mexicana from '../../assets/mexicana.png';
import quattro from '../../assets/quattro.png';

const Pizza = props => {
  const [price, setPrice] = useState(props.priceS);
  const [info, setInfo] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setInfo(false);
    }, 2000)
    return () => {
      clearTimeout(timer);
    }
  }, [info])

  const priceHandler = (e) => {
    setPrice(e.target.value);
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
    case 'Hawaiian':
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
        <img className={classes.PizzaImage} src={src} alt='Pizza'/>
        <div className={classes.Description}>
          <p>Ingredients</p>
          <p>{props.ingredients}</p>
        </div>
      </div>
      <h3>{props.name}</h3>
      <div className={classes.SelectForm}>
        <select name="size" id="size" onChange={priceHandler}>
          <option value={props.priceS}>S Ø27cm - {props.priceS} €</option>
          <option value={props.priceL}>L Ø32cm - {props.priceL} €</option>
          <option value={props.priceXL}>XL Ø42cm - {props.priceXL} €</option>
        </select>
      </div>
      <div className={classes.Button}>
        <button onClick={() => {
          props.orderHandler(props.name, price);
          setInfo(true);
        }}>Add to Basket</button>
        {info === true ? (<div>
          <i className="far fa-check-circle"></i>
        </div>) : null}
      </div>
    </div>
  )
}

export default Pizza;
