import React, {Component} from 'react';
import Message from './Message';


class MessageList extends Component {

    state = {messages :[
        {
          "id": 1,
          "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
          "read": false,
          "starred": true,
          "labels": ["dev", "personal"]
        },
        {
          "id": 2,
          "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
          "read": false,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 3,
          "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
          "read": false,
          "starred": true,
          "labels": ["dev"]
        },
        {
          "id": 4,
          "subject": "We need to program the primary TCP hard drive!",
          "read": true,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 5,
          "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
          "read": false,
          "starred": false,
          "labels": ["personal"]
        },
        {
          "id": 6,
          "subject": "We need to back up the wireless GB driver!",
          "read": true,
          "starred": true,
          "labels": []
        },
        {
          "id": 7,
          "subject": "We need to index the mobile PCI bus!",
          "read": true,
          "starred": false,
          "labels": ["dev", "personal"]
        },
        {
          "id": 8,
          "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
          "read": true,
          "starred": true,
          "labels": []
        }
      ]};

    render(){
        return(
            <div className = "MessageList">
            {this.state.messages.map((message) => <Message key = {message.id} id = {message.id} subject = {message.subject} read = {message.read} selected = {message.selected} labels = {message.labels} starred = {message.starred} toggleStarFlag ={this.toggleStarFlag} toggleCheckedBox = {this.toggleCheckedBox}/>)}
            </div>
        )
    }

    toggleStarFlag = (messageId) => {
                const indexOfItem = this.state.messages.findIndex(message => message.id === messageId), newList = [...this.state.messages];
                newList[indexOfItem].starred = !newList[indexOfItem].starred;
                this.setState({messages: newList});
            }


        toggleCheckedBox = (messageId) => {
                    const indexOfItem = this.state.messages.findIndex(message => message.id === messageId), newList = [...this.state.messages];
                    
        
            if (newList[indexOfItem].selected === undefined){
                newList[indexOfItem] = {...newList[indexOfItem],selected: true }
            
             }else{ 
             newList[indexOfItem].selected = !newList[indexOfItem].selected;
                    
                }
            this.setState({messages: newList});
        }

}

export default MessageList;