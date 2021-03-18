/* eslint-disable react/prop-types */
import React, { Component } from 'react'

class Toolbar extends Component {
  evalBulkSelectStyle = () => {
    switch (this.props.bulkSelectState) {
      case 'none':
        return 'fa-square-o'
      case 'all':
        return 'fa-check-square-o'
      case 'some':
        return 'fa-minus-square-o'
      default:
        return ''
    }
  }

  evalforToolbarActive = () => {
    switch (this.props.bulkSelectState) {
      case 'none':
        return true
      case 'all':
        return false
      case 'some':
        return false
      default:
        return ''
    }
  }

  render () {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadMessageCount}</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={(event) => this.props.bulkSelectMessage(event)}>
            <i className={`fa ${this.evalBulkSelectStyle()}`}></i>
          </button>

          <button disabled = {this.evalforToolbarActive()} className="btn btn-default" onClick = {() => this.props.markSelectedAsRead(true)} >Mark As Read</button>

          <button disabled = {this.evalforToolbarActive()} className="btn btn-default" onClick = {() => this.props.markSelectedAsRead(false)}>Mark As Unread</button>

          <select disabled = {this.evalforToolbarActive()} className="form-control label-select" onChange = {(e) => this.props.addSelectedLabel(e.target.value)} >
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select disabled = {this.evalforToolbarActive()} className="form-control label-select" onChange = {(e) => this.props.removeSelectedLabel(e.target.value)}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button disabled = {this.evalforToolbarActive()} className="btn btn-default" onClick = {(e) => {
            e.preventDefault()
            this.props.deleteSelectedMessages()
          }
            }>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Toolbar
