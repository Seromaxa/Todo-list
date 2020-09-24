import React, {useState} from 'react'
import './main.css'
import CategoryWrapper from './Aside/categoriWrapper/CategoryWrapper'
import AimsWrapper from './AimWrapper/AimsWrapper'
import AimInfo from './aimInfo/aiminfo'
import Exit from '../../UI/exit/Exit'





const Main = props => {
    const [doner, setDoner] = useState(0) // для подсчета категорий
    const [sort,setSort]=useState() // для сортировки
    const [selfCategory, setSelfCategory] = useState([]) // 
    const [aim,setAims] = useState([]) // для окна информации
    const [classArr,setClass]=useState(['aiminfo_wrapper'])
    const [info,setInfo]=useState([])
   
const setterDone =(aim)=>{
    setDoner(aim)
}
const setterSort = (sorter)=>{
    setSort(sorter)
}
const setterCat2 = (categ)=>{
    setSelfCategory(categ)
    }
const setterAim = (aims)=>{
    setAims(aims)
}

const mso =(event)=>{
    event.stopPropagation()
    setInfo(aim.filter(item=> item.text !== "" && item.id === event.target.id))
    let animClass
    let aimroulette
    let arr = [...classArr]
 aimroulette = Math.floor(Math.random()*(4 - 1 )+1)
 switch (aimroulette){
     case 1: animClass = 'first'
     break
     case 2: animClass = 'second'
     break
     case 3: animClass = 'third'
     break
     default: animClass = null     
    }
    arr.push(animClass)
   
    setClass(arr)   
  
}

const msg =(event)=>{
   event.stopPropagation()
  setClass(['aiminfo_wrapper'])
  setInfo([])
}

    return (
        <main>
            <article className='wrapper'>
                    <CategoryWrapper  setter1={setterSort} setter2 ={setterCat2} done={doner}  user={props.user}/>

                    <AimsWrapper setter ={setterDone} aimsetter={setterAim} user={props.user}
                   sort={sort} selfCategory={selfCategory}  msg={event=>msg(event)} mso={event=>mso(event)}/>   
               
                    <AimInfo aims={info} cln={classArr}/>
                    <Exit/>
            </article>
        </main>
    )
}


export default Main


// msg={event=>msg(event)} mso={event=>mso(event)}