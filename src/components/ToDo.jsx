import React, { Component } from "react";
// import "./index.css";

class ToDo extends Component {
  render() {
    return (
      <li className="todo stack-small">
        <div className="c-cb">
          <input
            id={this.props.id}
            type="checkbox"
            defaultChecked={this.props.completed}
            onChange={() => this.props.toggleTaskCompleted(this.props.id)}
          />
          <label className="todo-label" htmlFor="todo-0">
            {this.props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn">
            Edit <span className="visually-hidden">{this.props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => this.props.deleteTask(this.props.id)}
          >
            Delete <span className="visually-hidden">{this.props.name}</span>
          </button>
        </div>
      </li>
    );
  }
}

export default ToDo;
