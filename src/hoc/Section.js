import React from 'react'

const Section = props =>{
    return(
        <section className={props.cln}>
            {props.children}
        </section>
    )
}
export default Section