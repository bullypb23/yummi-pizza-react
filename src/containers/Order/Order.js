import React, { Component } from 'react';
import classes from './Order.module.css';
import Input from '../../components/Input/Input';
import Step from '../../components/Step/Step';
import { Redirect } from 'react-router-dom';
import { API_STORE_ORDER } from '../../shared/utility';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';

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
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street and street number*'
        },
        value: '',
        validation: {
          required: true,
          isAddress: true
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
    formIsValid: false,
    ordering: false
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
    this.setState({ ordering: true })
    axios.post(API_STORE_ORDER, {
      name: this.state.controls.name.value,
      address: this.state.controls.address.value,
      phone: this.state.controls.phone.value,
      email: this.state.controls.email.value,
      totalPrice: this.props.totalPrice,
      deliveryPrice: this.props.deliveryPrice,
      orderItems: this.props.pizzas
    }).then(response => {
      this.props.history.push('/completed');
      this.setState({ ordering: false })
    }).catch(err => {
      this.setState({ error: err, ordering: false })
    })
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
      const regex = /^[a-z ]+$/i;
      isValid = regex.test(String(value)) && isValid;
    } else if (rules.isAddress) {
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
      error = <p style={{color: 'var(--primary-color)'}}>Something went wrong. Please try again!</p>
    }

    return (
      <div className={classes.Order}> 
        <div className={classes.Steps}>
          <Step active><i className="fas fa-utensils"></i></Step>
          <Step active><i className="fas fa-shopping-cart"></i></Step>
          <Step active><i className="fas fa-user"></i></Step>
          <Step><i className="fas fa-truck"></i></Step>
        </div>
        <div className={classes.Details}>
          <h2>Delivery details</h2>
          <form onSubmit={this.submitHandler}>
            {form}
            <button className={classes.Submit} disabled={!this.state.formIsValid}>Order</button>
          </form>
          <p>Total price with delivery is {+this.props.totalPrice.toFixed(2) + +this.props.deliveryPrice.toFixed(2)}€.</p>
          {this.props.pizzas.length === 0 ? <Redirect to="/" /> : null}
          {error}
        </div>
        {this.state.ordering ? <Spinner /> : null}
      </div>
    )
  }
}

export default Order;