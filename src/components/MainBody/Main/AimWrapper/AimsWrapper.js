import React, { useState, useEffect, useRef} from 'react'
import './AimsWrapper.css'
import Section from '../../../../hoc/Section'
import Input from '../../../UI/inputs/create/Input'
import Button from '../../../UI/buttons/Button'
import AimsItem from './AimsItem'
import { clickHandler, selfCategCounter } from '../../../../conteiners/functions'
import {useSearching} from '../../../../hoc/Searching'




const AimsWrapper = props => {
  const [aim, setAim] = useState([])
  const [tmr,setTMR] =useState(0)
  const aName = useRef(null)
  const aCategory = useRef(null)
  const aText = useRef(null)
  const [doner, setDoner] = useState({
    done:0,
    impotant:0,
    deleted:0,
    overdue:0,
    selfCategory:''
  })
// const userId = localStorage.getItem('userId')

  const [testTim,setTest]=useState()


const {sValue} =useSearching()

  const setterForTimer = (time)=>{
    setTMR(time)
  }
 const setA = (aims)=>{
   setAim(aims)
 }

  const createAim = async (some) => {
    setAim(prev=>{
      return[
        ...prev,
        {
          name: some,
          id: Date.now().toString(),
          selfCategory: '',
          impotant: false,
          done: false,
          text: '',
          deleted: false,
          date: new Date(),
          overdue: false,
          options: false,
        }
      ]
    })
   
  }

// useEffect(() =>{
  
//  ( async function(){
//  await fetch(`${userId}/aimT.json`)
//     .then(response=>response.json())
//     .then(response=>setAim(response || []))  
//   }) ()
// },[userId])

useEffect(()=>{
  // try{
  //    fetch(`${userId}/aimT.json`,{
  //      method:'PUT',
  //      body:JSON.stringify(aim)
  //    })
     setDoner(prev=>{
      return{
        ...prev,
        done: aim.filter(item=>item.done === true && item.deleted !== true).length,
        impotant: aim.filter(item=>item.impotant === true && item.deleted !== true).length,
        deleted: aim.filter(item=>item.deleted === true).length,
        overdue: aim.filter(item=>item.overdue === true && item.deleted !== true).length,  
  
      }
    } 
    )
  //  }catch(e){
  //    console.log(e)
  //  }
},[aim])


  const thumbHandler = (event, key) => {
    event.stopPropagation()
    setAim(
      aim.map((item) => {
        if (item.id === event.target.parentElement.id) {
          item[key] = !item[key]
          if(item.done === true || item.deleted === true){
            setTest({
              id:item.id,
             overdueDate: 0,
             time:0
            })
          }
        } return item
      })
    )
    setDoner(prev=>{
      return{
        ...prev,
        done: aim.filter(item=>item.done === true && item.deleted !== true).length,
        impotant: aim.filter(item=>item.impotant === true && item.deleted !== true).length,
        deleted: aim.filter(item=>item.deleted === true).length,
        overdue: aim.filter(item=>item.overdue === true && item.deleted !== true).length,
        selfCategory:selfCategCounter(props.selfCategory,aim)   
  
      }
    } 
    )
  }

  const deleteItemHandler = (event) => {
    setAim(
      aim.filter(item => item.id !== event.target.parentElement.id)
    )
  }
  
  const closeHandler = (event) => {
    setAim(
      aim.map(item => {
        if (item.id === event.target.parentElement.parentElement.id) {
          item.options = !item.options
        } return item
      }
      ))
      
  }
  const optionHandller = (event) => {

    let name = aName.current.value
    let category = aCategory.current.value
    let text = aText.current.value
    setAim(
      aim.map(item => {
        if (item.id === event.target.parentElement.id) {
          item.name = name
          item.text = text

          item.selfCategory = category
          
         setTest(()=>{
           if((tmr.d * 86400)+(tmr.h * 3600)+(tmr.m * 60)+(tmr.s * 1)>0){


            if(item.overdue === true){
              item.overdue = false
              setDoner(prev=>{
                return{
                  ...prev,
                  overdue:aim.filter(item=>item.overdue === true && item.deleted !== true).length,
                  
                }
              })
            }
             let time = (tmr.d * 86400)+(tmr.h * 3600)+(tmr.m * 60)+(tmr.s * 1)
           return{
             id:item.id,
             overdueDate: Date.now() + time *1000,
             time
           }
           }
         })        
          item.options = !item.options      
        } return item
      }))
  setDoner(prev=>{
    return{
      ...prev,
      selfCategory:selfCategCounter(props.selfCategory,aim)
    }
  })
  }
  

  useEffect(()=>{
    return ()=> props.aimsetter(aim)
  },[aim,props])

  useEffect(() => {
 return props.setter(doner)
  }, [doner,props])

function sorter(arr,obj){
  let sorted = arr
  sorted = sorted.filter(item=>{
    if(sValue.length >= 3){
  let sv = new RegExp (`${sValue}`,'gi')
  return item.name.match(sv) && item.deleted !== true
    }
  if(obj.toggle2 !== ''){
   return item[obj.toggle] === obj.operator && item.selfCategory === obj.toggle2
  }else{
    if(obj.toggle === 'deleted' && obj.operator === true){
      return item.deleted === true
    }else{
      return item[obj.toggle] === obj.operator && item.deleted !== true
    }
    
  }

})
return sorted
}
 
  return (
    <Section cln="aims-wrapper overfl">
      
      <Input holderDiv='create-wrapper' cls='creater' logo='Создать цель' create={event => clickHandler(event, createAim)} >
        <Button done={event => clickHandler(event, createAim)} styleClass='doner' hero={'Создать'} />
      </Input>
      <AimsItem aim={sorter(aim,props.sort)}
        thumb={event => thumbHandler(event, 'done')}
        impotant={event => thumbHandler(event, 'impotant')}
        options={event => thumbHandler(event, 'options')}
        optionsDel={event => thumbHandler(event, 'deleted')}
        lastDel={event => deleteItemHandler(event)}
        closer={event => closeHandler(event)}
        changer={event => optionHandller(event)}
        inputName = {aName}
        inputCategory = {aCategory}
        inputText = {aText}
        category ={props.selfCategory}
        set={setterForTimer}
        showText ={props.mso}
        showText2 ={props.msg}
        test = {testTim}
        setA = {setA}
        user={props.user}
        

     
      />

    </Section>


  )

}

export default AimsWrapper