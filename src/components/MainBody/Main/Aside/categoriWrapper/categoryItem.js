import React from 'react'


const CategoryItem= props =>{


    return(
        <div>
            <ul className='category_wrapper'>
    <li key={'all01'} onClick={props.reset}>Все</li>
    {props.catDefault.map((item,index) =>{ return(<li className={item.thumb?'red':null} key={index + item.name}  onClick={()=>props.clicker(item.name)}>{item.name} ({item.quantity})</li>)})}
            </ul>
        </div>
    )
}

export default CategoryItem