import React from 'react'

const Aside = props =>{
    return(
        <aside className={props.cln}>
            {props.children}
        </aside>
    )
}
export default Aside