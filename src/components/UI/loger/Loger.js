import React, {useState} from 'react'
import './Loger.css'
import Input from '../inputs/create/Input'
import Button from '../buttons/Button'
import is from 'is_js'




const Loger =(props)=>{

  
   
    const [email,setEmail] = useState({
        mail:'',
        errorMessage:'Введите верный email',
        valid:false,
    })
    const [password,setPassword] = useState({
        mail:'',
        errorMessage:'Введите верный пароль',
        valid:false,
    }) 


   const onChangeHandler = (event,type)=>{

    if(type === 'password'){
        let state = {...password}
        state.mail = event.target.value
    
     setPassword(state)
     } 
     if(type === 'email'){
       let state = {...email}
       state.mail = event.target.value
        if(state.valid === true){
            state.valid = false
            state.errorMessage = 'Введите верный email'
        }
    setEmail(state)
     }
      
   }

   const enterHendler=(url)=>{     ////   <= async
    
    // let address = null
//  if(url === 'singUp'){
//  address = ''
//  } 
//  if(url === 'logIn')  {
//      address = ''
//  }
let stateMail = {...email}
let statePassword = {...password}
stateMail.valid = !is.email(stateMail.mail)
statePassword.valid = statePassword.mail.length < 6?true:false
setPassword(statePassword)
setEmail(stateMail)
//  if(stateMail.valid === false && statePassword.valid === false){
//          try{
//    let response =  await fetch(address,{
//              method:'POST',
//              body:JSON.stringify({
//                  email:email.mail,
//                  password: password.mail,
//                  returnSecureToken: true
//              })
//            })
//        if(response.ok){
//            const data = await response.json()
//            localStorage.setItem('token',data.idToken)
//            localStorage.setItem('userId',data.localId)
    
//            props.history.push('/list')
//        }else{
//         let error = await response.json()
//            switch (error.error.message) {
//                case 'EMAIL_EXISTS':
//                    setEmail(prev => {
//                        return {
//                            ...prev,
//                            errorMessage: 'Данный адресс уже используется',
//                            valid: true,
//                        }
//                    })
//                    break
//                case 'EMAIL_NOT_FOUND':
//                    setEmail(prev => {
//                        return {
//                            ...prev,
//                            valid: true,
//                        }
//                    })
//                    break
//                case 'INVALID_PASSWORD':
//                    setPassword(prev => {
//                        return {
//                            ...prev,
//                            valid: true,
//                        }
//                    })
//                    break
//                 default:
//                     alert('Беспонятия что то явно не так')   
//            }
    //    }

        
         
        //  }catch(e){
        //      console.log(e)
        //  }
//  }else{
//      return
//  }

////  for local host ////
if(stateMail.valid === false && statePassword.valid === false){
    props.history.push('/list')
}
}


    return (
        <div className='loging'>
            <div className='auth-wrapper'>
                <h1>Авторизация</h1>
       <form  className='auth_form' onSubmit={event=>event.preventDefault()}>
           <Input type='email' holderDiv='log_inp' cls='mail' logo='email' warning={email.errorMessage} clSpan='warning' warningM ={email.valid} changer={event=>onChangeHandler(event,'email')}/>

           <Input type = 'password' holderDiv='log_inp' cls='password' logo='password'  warning={password.errorMessage} clSpan='warning'  warningM={password.valid} changer={event=>onChangeHandler(event,'password')} />
           <div className='button_holder'>

           <Button done={()=>enterHendler('logIn')} hero= 'Войти'/>
           <Button done={()=>enterHendler('singUp')} hero = 'Регистрация' />
           </div>
       </form>
       </div>
        </div>
    )
}
export default Loger