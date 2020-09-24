import React from 'react'
import './Nav.css'

const Nav = props => {
    return (
        <nav className='navigation overfl'>
            <ul className='link_list category_wrapper'>
                {props.selfCategory.map((item, index) => { return <li key={index + item.name} onClick={event=>props.newCategThumb(item.name,event)} className={item.thumb===true?'red':null} >{item.name} ({item.quantity})<div id = {item.name} onClick={props.newCategoryDell}  title='удалить'>&#10007;</div></li> })}
            </ul>
        </nav>
    )
}
export default Nav