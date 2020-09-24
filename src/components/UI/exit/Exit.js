import React from 'react'
import {withRouter} from 'react-router-dom'
import './exit.css'

const Exit = props =>{

    const exitHandler=()=>{
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        // localStorage.removeItem()
        props.history.push('/')
    }

    return(
        <div className='exit' onClick = {exitHandler}><h1>Exit</h1></div>
    )
}
export default withRouter(Exit)