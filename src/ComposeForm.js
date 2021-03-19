import React, { Component } from 'react'

class ComposeForm extends Component {
  state = {
    subject: null,
    body: null
  }

  render () {
    return (
<form className="form-horizontal well">
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <h4>Compose Message</h4>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
    <div className="col-sm-8">
      <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" onChange = {(e) => {
        e.preventDefault()
        this.setState({ subject: e.target.value })
      }}/>
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
    <div className="col-sm-8">
      <textarea name="body" id="body" className="form-control" onChange = {(e) => {
        e.preventDefault()
        this.setState({ body: e.target.value })
      }}></textarea>
    </div>
  </div>
  <div className="form-group">
    <div className="col-sm-8 col-sm-offset-2">
      <input type="submit" value="Send" className="btn btn-primary" onClick = {(e) => {
        e.preventDefault()
        if (this.state.body !== null && this.state.message !== null) {
          // eslint-disable-next-line react/prop-types
          this.props.postMessageToServer(this.state)
        }
      }}/>
    </div>
  </div>
</form>
    )
  }
}
export default ComposeForm
