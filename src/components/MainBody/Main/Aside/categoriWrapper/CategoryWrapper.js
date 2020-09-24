import React, { useState, useEffect } from 'react'
import Aside from '../../../../../hoc/Aside'
import Nav from '../Navigation/Nav'
import Input from '../../../../UI/inputs/create/Input'
import Button from '../../../../UI/buttons/Button'
import './CategoryWrapper.css'
import { clickHandler } from '../../../../../conteiners/functions'
import CategoryItem from './categoryItem'
import {useSearching} from '../../../../../hoc/Searching'



const CategoryWrapper = props => {

    const [category, setCategory] = useState([
        {
            name: 'Важные',
            quantity: 0,
            thumb: false
        },
        {
            name: 'Завершенные',
            quantity: 0,
            thumb: false

        },
        {
            name: 'Просроченные',
            quantity: 0,
            thumb: false
        },
        {
            name: 'Удаленные',
            quantity: 0,
            thumb: false
        },
    ])
    const [selfCategory, setSelfCategory] = useState([])
    const [sort, setSort] = useState({
        toggle: 'deleted',
        operator: false,
        toggle2: ''
    })

    const {resetVal} = useSearching()
    // const userId = localStorage.getItem('userId')
    const createDir = async (some) => {
           setSelfCategory(prev=>{
               return[
                   ...prev,
                   {
                    name: some,
                    quantity: 0,
                    thumb: false
                }
               ]
           }) 
    }
    // useEffect(() =>{
    //     ( async function(){
    //     await fetch(`${userId}/self.json`)
    //        .then(response=>response.json())
    //        .then(response=>setSelfCategory(response || []))
    //      }) ()
        
    //    },[userId])

// useEffect(()=>{
//     try{
//         fetch(`${userId}/self.json`,{
//           method:'PUT',
//           body:JSON.stringify(selfCategory)
//         })
     
       
//       }catch(e){
//         console.log(e)
//       }
//    },[selfCategory,userId])


    const newCategoryDell = (event) => {
        event.stopPropagation()
        let newCategory = selfCategory
        newCategory = selfCategory.filter(item => item.name !== event.target.id)
        setSelfCategory(newCategory)
    }

    useEffect(() => {
        props.setter1(sort)
    }, [sort, props])

    useEffect(() => {
        props.setter2(selfCategory)
    }, [selfCategory, props])

    useEffect(() => {
        setCategory(category => category.map(item => {
            if (item.name === 'Завершенные') {
                item.quantity = props.done.done
            }
            if (item.name === 'Важные') {
                item.quantity = props.done.impotant
            }
            if (item.name === 'Удаленные') {
                item.quantity = props.done.deleted
            }
            if (item.name === 'Просроченные') {
                item.quantity = props.done.overdue
            }
            return item
        }))
        if (typeof props.done.selfCategory === 'object') {
            setSelfCategory(selfCategory => selfCategory.map(item => {
                if (props.done.selfCategory.has(item.name) === true) {
                    item.quantity = props.done.selfCategory.get(item.name)
                } else {
                    item.quantity = 0
                }
                return item
            }))
        }

    }, [props.done])

    const categoryThumbHandler = (name) => {
        let nameId = 'deleted'
        let oper = false        
        setCategory(category => category.map(item => {
            if (item.name.trim() === name.trim() || (item.name.trim() !== name.trim() && item.thumb === true)) {
                item.thumb = !item.thumb
                if (item.name === 'Завершенные' || item.name === 'Важные' || item.name === 'Просроченные' || item.name === 'Удаленные') {
                    if (item.name === 'Завершенные' && item.thumb === true) {
                        nameId = 'done'
                        oper = true
                    }
                    if (item.name === 'Важные' && item.thumb === true) {
                        nameId = 'impotant'
                        oper = true
                    }
                    if (item.name === 'Просроченные' && item.thumb === true) {
                        nameId = 'overdue'
                        oper = true
                    }
                    if (item.name === 'Удаленные' && item.thumb === true) {
                        nameId = 'deleted'
                        oper = true
                    }
                    setSort(prev => {
                        return {
                            ...prev,
                            toggle: nameId,
                            operator: oper
                        }
                    })

                }              

            }
            return item
        }))
resetVal()
    }

const selfCatThumb = (name,event)=>{
    event.stopPropagation()
    setSelfCategory(selfCategory=>selfCategory.map(item=>{if (item.name.trim() === name.trim() || (item.name.trim() !== name.trim() && item.thumb === true)) {
        item.thumb = !item.thumb
        if (item.thumb === true) {
            setSort(prev => {
                return {
                    ...prev,
                    toggle2: item.name
                }
            })
        } if (item.thumb !== true) {
            setSort(prev => {
                return {
                    ...prev,
                    toggle2: ''
                }
            })

        }
    }return item}))
    resetVal()
}



    const categoryReset = () => {
        setCategory(category => category.map(item => {
            if (item.thumb === true) {
                item.thumb = false
            } return item
        }))
        setSelfCategory(selfCategory => selfCategory.map(item => {
            if (item.thumb === true) {
                item.thumb = false
            } return item
        }))
        setSort(prev => {
            return {
                ...prev,
                toggle: 'deleted',
                operator: false,
                toggle2: ''
            }
        })
    resetVal()
    }

    return (

        <Aside cln='link-wrapper'>
            <Input holderDiv='create-wrapper' cls='creater' create={event => clickHandler(event, createDir)} >
                <Button done={event => clickHandler(event, createDir)} styleClass='doner' hero='Создать' />
            </Input>
            <Nav selfCategory={selfCategory} newCategoryDell={event => newCategoryDell(event)} newCategThumb={selfCatThumb} />
            <CategoryItem catDefault={category} clicker={categoryThumbHandler} reset={categoryReset} />
        </Aside>
    )
}

export default CategoryWrapper

// newCategThumb={event => categoryThumbHandler(event, setSelfCategory)}

   // if (item.name.split(' ').join('').trim() !== event.target.innerText.match(str).join('').trim() && item.thumb === true) {
            //     item.thumb = false
            // }


