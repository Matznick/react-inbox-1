import './App.css';
import React, {Component} from 'react';
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import Message from "./Message"

class App extends Component{

render(){
  return(
    <div>
      <Toolbar />
      <MessageList />
    
    </div>
  )
}


}

export default App;
