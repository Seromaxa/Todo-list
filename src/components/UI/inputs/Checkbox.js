import React from 'react'


const Checkbox =(props)=>{
    return(
        <>
        <input type='checkbox'className={props.cln} id={props.it} onChange={props.thumb} checked={props.check?true:false}/>
    <label htmlFor={props.it} title={props.title}>{props.logo}</label>
        </>
    )
}
export default Checkbox