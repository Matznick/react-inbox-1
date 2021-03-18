import './App.css'
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import React, { Component } from 'react'

class App extends Component {
  state = {
    messages: [],
    bulkSelectState: null,
    totalUnreadMessageCount: null
  }

  componentDidMount () {
    this.getMessagesfromServer()
    this.countAllUnreadMessages()
    this.setState({ bulkSelectState: this.checkBulkState() })
  }

  getMessagesfromServer = async () => {
    const messagesRaw = await fetch('http://localhost:8082/api/messages')
    const messagesJSON = await messagesRaw.json()
    this.setState({ messages: messagesJSON })
  }

  countAllUnreadMessages = () => {
    this.setState({ totalUnreadMessageCount: this.state.messages.filter((message) => !message.read).length })
  }

  getSelectedMessageIds = () => (
    this.state.messages.filter((message) => message.selected).map((message) => message.id)
  )

  patchMessage = async (body) => {
    await fetch('http://localhost:8082/api/messages', {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
    await this.getMessagesfromServer()
  }

  toggleStarFlag = async (messageId) => {
    const body = {
      messageIds: [messageId],
      command: 'star'
    }
    await this.patchMessage(body)
  }

  deleteSelectedMessages = async () => {
    console.log('DELETE')
    const body = {
      messageIds: this.getSelectedMessageIds(),
      command: 'delete'
    }
    await this.patchMessage(body)
    this.countAllUnreadMessages()
  }

  markSelectedAsRead = async (read) => {
    const body = {
      messageIds: this.getSelectedMessageIds(),
      command: 'read',
      read: read
    }
    await this.patchMessage(body)
  }

  toggleSelectedFlag = (messageId) => {
    const itemIndex = this.state.messages.findIndex(
      (message) => message.id === messageId)
    const newList = [...this.state.messages]
    // eslint-disable-next-line valid-typeof
    if (typeof newList[itemIndex].checked === undefined) {
      newList[itemIndex] = {
        ...newList,
        selected: true
      }
    } else {
      newList[itemIndex].selected = !newList[itemIndex].selected
    }

    this.setState({
      messages: newList,
      bulkSelectState: this.checkBulkState()
    })
  }

  checkBulkState = () => {
    let hasSomeChecked
    if (this.state.messages.every((message) => message.selected)) {
      hasSomeChecked = 'all'
    } else if (this.state.messages.every((message) => !message.selected)) {
      hasSomeChecked = 'none'
    } else {
      hasSomeChecked = 'some'
    }
    return hasSomeChecked
  }

  bulkSelectMessage = (e) => {
    e.preventDefault()
    if (this.state.messages.every((message) => message.selected)) {
      const newList = [...this.state.messages]
      newList.map((message) => (message.selected = false))
      this.setState({ messages: newList, bulkSelectState: 'none' })
    } else {
      const newList = [...this.state.messages]
      newList.map((message) => (message.selected = true))
      this.setState({ messages: newList, bulkSelectState: 'all' })
    }
  }

  addSelectedLabel = async (label) => {
    const body = {
      messageIds: this.getSelectedMessageIds(),
      command: 'addLabel',
      label: label
    }
    await this.patchMessage(body)
  }

  removeSelectedLabel = async (label) => {
    const body = {
      messageIds: this.getSelectedMessageIds(),
      command: 'removeLabel',
      label: label
    }
    await this.patchMessage(body)
  }

  render () {
    return (
      <div className="App">
        <Toolbar
          bulkSelectMessage={this.bulkSelectMessage}
          bulkSelectState={this.state.bulkSelectState}
          markSelectedAsRead={this.markSelectedAsRead}
          markSelectedAsUnRead={this.markSelectedAsUnRead}
          deleteSelectedMessages={this.deleteSelectedMessages}
          addSelectedLabel={this.addSelectedLabel}
          removeSelectedLabel={this.removeSelectedLabel}
          unreadMessageCount={this.state.totalUnreadMessageCount}
        />
        <MessageList
          messages={this.state.messages}
          toggleStarFlag={this.toggleStarFlag}
          toggleSelectedFlag={this.toggleSelectedFlag}
        />
      </div>
    )
  }
}

export default App
