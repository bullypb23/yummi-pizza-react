import React, { Component } from 'react';
import classes from './Order.module.css';
import Input from '../../components/Input/Input';
import { Redirect } from 'react-router-dom';

// import axios from 'axios';

class Order extends Component {
  state = {
    controls: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Full name*'
        },
        value: '',
        validation: {
          required: true,
          isName: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street and street number*'
        },
        value: '',
        validation: {
          required: true,
          isStreet: true
        },
        valid: false,
        touched: false
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Phone number*'
        },
        value: '',
        validation: {
          required: true,
          minLength: 9,
          isNumber: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email address*'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      }
    },
    error: null,
    formIsValid: false
  }

  onChangeHandler = (event, controlName) => {
    const updatedControls = {...this.state.controls};
    const updatedFormElement = {...this.state.controls[controlName]};

    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

    updatedControls[controlName] = updatedFormElement;

    let formIsValid = true;
    for (let controlName in updatedControls) {
      formIsValid = updatedControls[controlName].valid && formIsValid;
    }

    this.setState({controls: updatedControls, formIsValid: formIsValid});
  }

  submitHandler = (event) => {
    event.preventDefault();
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }; 

    if (rules.isEmail) {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = regex.test(String(value)) && isValid;
    } else if (rules.isNumber) {
      const regex = /^[0-9]+$/;
      isValid = regex.test(value) && isValid;
    } else if (rules.isName) {
      const regex = /^[a-z A-Z]+$/;
      isValid = regex.test(String(value)) && isValid;
    } else if (rules.isStreet) {
      const regex = /^[a-z 0-9]+$/i;
      isValid = regex.test(String(value)) && isValid;
    }

    return isValid;
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementArray.map(element => {
      return (<Input
                elementType={element.config.elementType}
                key={element.id}
                shouldValidate={element.config.validation}
                touched={element.config.touched}
                invalid={!element.config.valid}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                changed={(event) => this.onChangeHandler(event, element.id)} />)
    });

    let error = null;
    if (this.state.error) {
      error = <p style={{color: 'var(--primary-color)'}}>{this.state.error.message}</p>
    }

    return (
      <div className={classes.Order}>
        <div className={classes.Details}>
          <h2>Delivery details</h2>
          {error}
          <form onSubmit={this.submitHandler}>
            {form}
            <button className={classes.Submit} disabled={!this.state.formIsValid}>Order</button>
          </form>
          {this.props.pizzas.length === 0 ? <Redirect to="/" /> : null}
          <p>Total price with delivery is {+this.props.totalPrice.toFixed(2) + +this.props.deliveryPrice.toFixed(2)}€.</p>
        </div>
      </div>
    )
  }
}

export default Order;