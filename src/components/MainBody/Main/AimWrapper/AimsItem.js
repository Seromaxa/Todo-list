import React, { useState, useEffect } from 'react'
import Checkbox from '../../../UI/inputs/Checkbox'
import { time, addClass, timerSet } from '../../../../conteiners/functions'
import Modal from '../../../UI/modal/Modal'


const AimsItem = (props) => {
    // const userId = localStorage.getItem('userId')
    const [test, setTest] = useState(new Map())
  

    // useEffect(() => {
    //     (async function () {
    //         await fetch(`${userId}/timers`)
    //             .then(response => response.json())
    //             .then(response => {
    //                 if (response === null) {
    //                     return
    //                 } else {
                    
    //                     setTest(new Map(Object.entries(JSON.parse(response))))
    //                 }
    //             }
    //             )
    //     })()
    // }, [userId])




    useEffect(() => {
        if (props.test !== undefined) {
            setTest(test => test.set(props.test.id, { time: props.test.time, overdueDate: props.test.overdueDate }))
        
                // fetch(`${userId}/timers.json`, {
                //     method: 'PUT',
                //     body: JSON.stringify(JSON.stringify(Object.fromEntries(test)))

                // })
            
        }
        // eslint-disable-next-line
    }, [props.test])


    useEffect(() => {   
        let a = [...props.aim]
        let buffer = test
        let t = setInterval(() => {
            let date = Date.now()
            for (let name of buffer.keys()) {
                buffer.get(name).time = (buffer.get(name).overdueDate - date) / 1000
                 if(buffer.get(name).overdueDate === 0 ){
                    buffer.delete(name)
                    // fetch(`/${userId}/timers.json`, {
                    //     method: 'PUT',
                    //     body: JSON.stringify(JSON.stringify(Object.fromEntries(buffer)))
                    // })
                  return  setTest(new Map(buffer))
                }
                if (buffer.get(name).time <= 0 ) {
                    a.map(item => {
                        if (item.id === name) {
                            item.overdue = true
                        } return item
                    })
                    props.setA(a)
                    buffer.delete(name)
                    setTest(new Map(buffer))
                    // fetch(`${userId}/timers.json`, {
                    //     method: 'PUT',
                    //     body: JSON.stringify(JSON.stringify(Object.fromEntries(buffer)))
                    // })
                }
                setTest(new Map(buffer))
            }
        }, 1000)
        if (buffer.size === 0) {
            return () => clearInterval(t)
        }
        return () => clearInterval(t)
    // eslint-disable-next-line
    },[test])

    let aimClass = ['words']
    return (
        <ul className='list aim_list'>
            {props.aim.map(item =>
                <li key={item.id} onMouseOver={props.showText} onMouseOut={props.showText2} id={item.id} className={addClass(['test'], item, 'impotant', 'impotant')}>
                    <Checkbox cln='thumb' it={'T' + item.id} thumb={props.thumb} check={item.done}
                    />

                    <p className={addClass(aimClass, item, 'done', 'words-decor')}>{item.name}</p>
                    <p className='category'>{item.selfCategory}</p>
                    {item.options ? <Modal
                        aim={item}
                        closer={props.closer}
                        changer={props.changer} //submit
                        inputName={props.inputName}
                        inputCategory={props.inputCategory}
                        inputText={props.inputText}
                        category={props.category}
                        set={props.set}
                    /> : null}

                    {item.deleted === true ? <>
                        <div className='options options_margin' title='Настроить' onClick={props.options}>&#8942;</div>
                        <div className='options ' title='востановить' onClick={props.optionsDel}>&#10004;</div>
                        <div className='options ' title='удалить' onClick={props.lastDel}>&#10007;</div>

                    </> :
                        <>
                            <div className='options options_margin' title='Настроить' onClick={props.options}>&#8942;</div>
                            <div className='options ' title='удалить' onClick={props.optionsDel}>&#10007;</div>
                        </>}
                    <div className='date'>
                        <p className='made'>
                            {time(item)}</p>

                        {test.has(item.id) ? <span className='timer'>{timerSet(test.get(item.id).time).d + ':' + timerSet(test.get(item.id).time).h + ':' + timerSet(test.get(item.id).time).m}<i className='seconds'>{timerSet(test.get(item.id).time).s}</i></span> : null}

                        {item.overdue ? <span className='overdue'>wasted</span> : null}


                    </div>
                    <Checkbox cln='thumb circle' it={'I' + item.id} thumb={props.impotant} check={item.impotant} title='Важные' />
                </li>)}


        </ul>
    )
}

export default AimsItem