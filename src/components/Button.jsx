import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    console.log("Calling app.submitForm() .. ");
    this.props.submitForm();
  }

  render() {
    return (
      <button type="button" onClick={() => this.submitForm()}>
        {this.props.name ? this.props.name : "Submit"}
      </button>
    );
  }
}

export default Button;
