import React, { Component } from 'react';
import Icon from "../../img/icon";
import "../../css/Utilities.css";

class Alert extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {isActive: true};
    this.isActive = true;
  }
  componentDidUpdate() {
    this.isActive = true;
  }
  hideAlert() {
    this.setState({isActive: false});
    this.isActive = false;
  }


  render() {
    //if (this.isActive) {
    return (
      <div
        className={`alert alert-dismissible fade alertbottom contentfont ${this.isActive && "show"}`}
        role="alert"
      >
        {/*<button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => this.hideAlert()}
        >
          <span aria-hidden="true">&times;</span>
        </button>*/}
        <div className="inline">
          <Icon
            name="info"
            alt="Danger"
            iconclass="alerticon"
          />
          {this.props.children}
          <div>
            <Icon
              name="close"
              alt="Close"
              iconclass="alertclose"
              onClick={() => this.hideAlert()}
            />
          </div>
        </div>
      </div>
    );
    //}
    //return <div/>
  }
}

export default Alert;
