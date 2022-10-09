import React, { Component } from "react";

class FilterButton extends Component {
  render() {
    return (
      <button
        type="button"
        className="btn toggle-btn"
        aria-pressed={this.props.isPressed}
        onClick={() => this.props.setFilter(this.props.name)}
      >
        <span className="visually-hidden">Show </span>
        <span>{this.props.name}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    );
  }
}

export default FilterButton;
