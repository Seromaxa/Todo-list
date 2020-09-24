import React from 'react'
import Header from './components/Header/Header'
import Main from './components/MainBody/Main'
import {Searching} from './hoc/Searching'
import Loger from './components/UI/loger/Loger'
import {BrowserRouter as Router, Route} from 'react-router-dom'






const App =()=> {

 function renderApp (){
  return ( 
     <Searching>
    <div className="App">
      <Header />
      <Main />
    </div>
    </Searching>)
 }

    return (
      <Router>
      <Route path = '/' exact component = {Loger} />
       <Route path = {`/list`} exact component={renderApp}/>     
      </Router>
    );
  }

export default App;