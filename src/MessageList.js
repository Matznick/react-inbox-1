/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {
  render () {
    return (
            <div className = "MessageList">
            {this.props.messages.map((message) => <Message key = {message.id} id = {message.id} subject = {message.subject} read = {message.read} selected = {message.selected} labels = {message.labels} starred = {message.starred} toggleStarFlag ={this.props.toggleStarFlag} toggleCheckedBox = {this.props.toggleCheckedBox}/>)}
            </div>
    )
  }
}

export default MessageList
