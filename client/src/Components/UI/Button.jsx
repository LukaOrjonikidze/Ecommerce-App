import React from 'react';
import classes from '../../Modules/Button.module.css';

const Button = (props) => {


    return (
        <button type={props.type}  onClick={props.onClick} id={props.id} className={`${classes['btn']} ${classes[props.variant]}`} >{props.children}</button>
    )
}

export default Button