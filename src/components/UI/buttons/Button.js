import React from 'react'
import './button.css'

const Button = props =>{
    
    return(
    <button className={props.styleClass} onClick={props.done}>{props.hero}</button>
    )
}

export default Button