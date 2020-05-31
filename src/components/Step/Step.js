import React from 'react';
import classes from './Step.module.css';

const Step = props => {
  const stepClasses = [classes.Step];
  
  if (props.active) {
    stepClasses.push(classes.active);
  }
  return (
    <div className={stepClasses.join(' ')}>
      {props.children}
    </div>
  )
}

export default Step;
