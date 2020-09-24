import React from 'react'
import './creater.css'


const Input = props =>{
    const inputType = props.type || 'text'
    
    const htmlFor = `${inputType}-${Math.random()}`

    return(
        <div className={props.holderDiv}>
            <label htmlFor = {htmlFor}>{props.labelHero}</label>
            <input className={props.cls} id={htmlFor}  type={inputType} placeholder={props.logo} onKeyDown={props.create} onChange={props.changer} ref={props.refs} onFocus={props.onFocus} />
    {props.warningM?<span className={props.clSpan}>{props.warning}</span>:null}
            {props.children}
        </div>



    )
}
export default Input

