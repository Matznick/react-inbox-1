import React, {Component} from 'react';


class Message extends Component {

render(){
    
    return(

        <div className={`row message ${this.props.read? "read" : "unread"} ${this.props.selected? "selected" : ""}`}>
  <div className="col-xs-1">
    <div className="row">
      <div className="col-xs-2">
        <input type="checkbox" checked = {this.props.selected? "checked" : "" } onClick = {() => this.props.toggleCheckedBox(this.props.id)} />
      </div>
      <div className="col-xs-2">
        <i className={`star fa ${this.props.starred? "fa-star": "fa-star-o"}`} onClick = {() => this.props.toggleStarFlag(this.props.id)}></i>
      </div>
    </div>
  </div>
  <div className="col-xs-11">
      {this.props.labels.map((label) => <span key ={label} class="label label-warning">{label}</span>)}
    <a href="#">
      {this.props.subject}
    </a>
  </div>
</div>
    )
}

}

export default Message;