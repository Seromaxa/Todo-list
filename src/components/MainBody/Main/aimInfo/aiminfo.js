import React from 'react'
import './aiminfo.css'
import Section from '../../../../hoc/Section'
import {time} from '../../../../conteiners/functions'

const AimInfo = (props) =>{


    return (
         <Section cln='aimsInfo'>
      {props.aims.map(item=> <div key={'info' + item.id} className={props.cln.join(' ')}>
            <div className ='aiminfo_header' >
    <h3>{item.name}</h3> <span>{time(item)}</span>
            </div>
            <div className = 'aiminfo_header'>
    <h4>{item.selfCategory}</h4>
            </div>
      <p className='text_holder' >{item.text}</p>
        </div>)}
        </Section>
    )
}
export default AimInfo