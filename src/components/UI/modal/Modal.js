import React, { useState,useEffect } from 'react'
import { addClass,timerSet } from '../../../conteiners/functions'
import './modal.css'
import Button from '../buttons/Button'
import Textbook from './svg/textbook'
import Folder from './svg/folder'
import Network from './svg/network'
import TimerClock from './svg/stopwatch'




const Modal = props => {
    let classArr = ['modal_position']
    
    const [time, setTime] = useState(timerSet(0))
    const [toggle]=useState({options:true}) //use to chenge visidility
   
    useEffect(() => {
        return props.set(time)
         }, [time,props])

     

    const debugTimer = (num, day, operator) => {
        let dayNum = time[day]
        if (operator === '+') {
            if (time[day] >= num) {
                setTime(prev => {
                    return {
                        ...prev,
                        [day]: '00'
                    }
                })
            } else {
                dayNum = +dayNum + 1
                dayNum = String(dayNum)
                dayNum = dayNum.length < 2 ? 0 + dayNum : dayNum
                setTime(prev => {
                    return {
                        ...prev,
                        [day]: dayNum
                    }
                })
            }
        }
            if (operator === '-') {
                dayNum = +dayNum - 1
                dayNum = String(dayNum)
                dayNum = dayNum.length < 2 ? 0 + dayNum : dayNum
                setTime(prev => {
                    return {
                        ...prev,
                        [day]: dayNum
                    }
                })
                if(time[day] <=0){
                    setTime(prev => {
                        return {
                            ...prev,
                            [day]: num
                        }
                    })
                }
            }

        }

        

    return (
        <>

            {<div key={'M' + props.aim.id} className={addClass(classArr, toggle, 'options', 'modal_visibility')}>
                <div className='form_wrapper' id={props.aim.id} >
                    <div className='modal-header'><img className='header_img' src='./business.jpg' alt='business' />
                        <p className='closer' onClick={props.closer}>&#9746;</p>
                    </div>
                    <div className='slider'>
                        <input type='radio' className='checker' name='check' id='slide1' defaultChecked />
                        <input type='radio' className='checker' name='check' id='slide2' />
                        <input type='radio' className='checker' name='check' id='slide3' />
                        <input type='radio' className='checker' name='check' id='slide4' />
                        <ul className='input_wrapper'>
                            <li className='holder_s slide1'><input ref={props.inputName} type='text' className='vision' defaultValue={props.aim.name} autoFocus /></li>
                            <li className='holder_s slide2'><select ref={props.inputCategory} className='vision' >
                                <option className='opt_list'>{props.aim.selfCategory}</option>
                                {props.category.map((item, index) => <option className='opt_list' key={item.name + index}
                                    value={item.name}>{item.name}</option>)}
                                <option className='opt_list'></option>
                            </select></li>
                            <li className='holder_s slide3'><textarea ref={props.inputText} defaultValue={props.aim.text} className='vision' rows='4'/></li>
                            <li className='holder_s slide4'>
                                <div className='tmr_wrapper'>

                                    <div className='arrow up' onClick={() => debugTimer(14,'d','+')}
                                    ></div>

                                    <p  className='tmr'>{time.d}</p>

                                    <div className='arrow down' onClick={() => debugTimer(14,'d','-')}></div>
                                </div>
                                <div className='tmr_wrapper'>
                                    <div className='arrow up' onClick={() => debugTimer(23,'h','+')} ></div>
                                    <p className='tmr'>{time.h}</p>
                                    <div className='arrow down' onClick={() => debugTimer(23,'h','-')} ></div>

                                </div>
                                <div className='tmr_wrapper'>
                                    <div className='arrow up' onClick={() => debugTimer(59,'m','+')} ></div>
                                    <p  className='tmr'>{time.m}</p>
                                    <div className='arrow down' onClick={() => debugTimer(59,'m','-')} ></div>
                                </div>
                            </li>

                        </ul>
                        <div className='controls'>
                            <label onClick={()=>props.inputName.current.focus()} className='label_circle' name='name' htmlFor='slide1'><Folder /></label>
                            <label className='label_circle' name='category' htmlFor='slide2'><Network /></label>
                            <label onClick={()=>props.inputText.current.focus()} className='label_circle' name='text' htmlFor='slide3'><Textbook /></label>
                            <label className='label_circle' name='timer' htmlFor='slide4'><TimerClock /></label>
                        </div>
                    </div>
                    <Button hero='Изменить' styleClass='subber' done={props.changer} />
                </div>

            </div>}
        </>
    )
}
export default Modal