import './App.css'
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import React, { Component } from 'react'

class App extends Component {
  state = {
    messages: [
      {
        id: 1,
        subject:
          "You can't input the protocol without calculating the mobile RSS protocol!",
        read: false,
        starred: true,
        labels: ['dev', 'personal']
      },
      {
        id: 2,
        subject:
          "connecting the system won't do anything, we need to input the mobile AI panel!",
        read: false,
        starred: false,
        selected: true,
        labels: []
      },
      {
        id: 3,
        subject:
          'Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!',
        read: false,
        starred: true,
        labels: ['dev']
      },
      {
        id: 4,
        subject: 'We need to program the primary TCP hard drive!',
        read: true,
        starred: false,
        selected: true,
        labels: []
      },
      {
        id: 5,
        subject:
          'If we override the interface, we can get to the HTTP feed through the virtual EXE interface!',
        read: false,
        starred: false,
        labels: ['personal']
      },
      {
        id: 6,
        subject: 'We need to back up the wireless GB driver!',
        read: true,
        starred: true,
        labels: []
      },
      {
        id: 7,
        subject: 'We need to index the mobile PCI bus!',
        read: true,
        starred: false,
        labels: ['dev', 'personal']
      },
      {
        id: 8,
        subject:
          'If we connect the sensor, we can get to the HDD port through the redundant IB firewall!',
        read: true,
        starred: true,
        labels: []
      }
    ],
    bulkSelectState: 'some',
    totalUnreadMessageCount: 0
  }

  componentDidMount () {
    this.countAllUnreadMessages()
  }

  countAllUnreadMessages = () => {
    this.setState({ totalUnreadMessageCount: this.state.messages.filter((message) => !message.read).length })
  }

  toggleStarFlag = (messageId) => {
    const itemIndex = this.state.messages.findIndex(
      (message) => message.id === messageId
    )
    const newList = [...this.state.messages]
    newList[itemIndex].starred = !newList[itemIndex].starred
    this.setState({ messages: newList })
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

  markSelectedAsRead = () => {
    const newList = [...this.state.messages]
    newList.filter((message) => message.selected).map((markedMessages) => (markedMessages.read = true))
    this.setState({ messages: newList })
    this.countAllUnreadMessages()
  }

  markSelectedAsUnRead = () => {
    const newList = [...this.state.messages]
    newList.filter((message) => message.selected).map((markedMessages) => (markedMessages.read = false))
    this.setState({ messages: newList })
    this.countAllUnreadMessages()
  }

  deleteSelectedMessages = () => {
    const newList = [...this.state.messages]
    this.setState({ messages: newList.filter((message) => !message.selected) })
    this.countAllUnreadMessages()
  }

  addSelectedLabel = (event) => {
    const newList = [...this.state.messages]
    newList.filter((message) => (message.selected) && message.labels.every((label) => label !== event.target.value)).map((message) => (message.labels = [...message.labels, event.target.value]))
    this.setState({ messages: newList })
  }

  removeSelectedLabel = (event) => {
    const newList = [...this.state.messages]
    newList.filter((message) => (message.selected) && message.labels.some((label) => label === event.target.value)).map((message) => (message.labels = [...message.labels].filter((label) => label !== event.target.value)))
    this.setState({ messages: newList })
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
          addSelectedLabel = {this.addSelectedLabel}
          removeSelectedLabel = {this.removeSelectedLabel}
          unreadMessageCount = {this.state.totalUnreadMessageCount}
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
