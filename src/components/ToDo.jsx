import React, { Component } from "react";
// import "./index.css";
import axios from "axios";

const localhost = process.env.LOCALHOST;

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newName: "",
    };
  }

  setEditing() {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editTask(this.props.id, this.state.newName);
    this.setState({
      newName: this.state.newName,
      isEditing: !this.state.isEditing,
    });
  }

  handleChange(e) {
    this.setState({
      newName: e.target.value,
    });
  }

  render() {
    const editingTemplate = (
      <form className="stack-small" onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <label className="todo-label" htmlFor={this.props.id}>
            New name for {this.props.name}
          </label>
          <input
            id={this.props.id}
            className="todo-text"
            type="text"
            value={this.state.newName}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn todo-cancel"
            onClick={() => this.setEditing()}
          >
            Cancel
            <span className="visually-hidden">renaming {this.props.name}</span>
          </button>
          <button type="submit" className="btn btn__primary todo-edit">
            Save
            <span className="visually-hidden">
              new name for {this.props.name}
            </span>
          </button>
        </div>
      </form>
    );
    const viewTemplate = (
      <div className="stack-small">
        <div className="c-cb">
          <input
            id={this.props.id}
            type="checkbox"
            defaultChecked={this.props.completed}
            onChange={() => this.props.toggleTaskCompleted(this.props.id)}
          />
          <label className="todo-label" htmlFor={this.props.id}>
            {this.props.name}
          </label>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn"
            onClick={() => this.setEditing()}
          >
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
      </div>
    );
    return (
      <li className="todo">
        {this.state.isEditing ? editingTemplate : viewTemplate}
      </li>
    );
    // return (
    //   <li className="todo stack-small">
    //     <div className="c-cb">
    //       <input
    //         id={this.props.id}
    //         type="checkbox"
    //         defaultChecked={this.props.completed}
    //         onChange={() => this.props.toggleTaskCompleted(this.props.id)}
    //       />
    //       <label className="todo-label" htmlFor="todo-0">
    //         {this.props.name}
    //       </label>
    //     </div>
    //     <div className="btn-group">
    //       <button type="button" className="btn">
    //         Edit <span className="visually-hidden">{this.props.name}</span>
    //       </button>
    //       <button
    //         type="button"
    //         className="btn btn__danger"
    //         onClick={() => this.props.deleteTask(this.props.id)}
    //       >
    //         Delete <span className="visually-hidden">{this.props.name}</span>
    //       </button>
    //     </div>
    //   </li>
    // );
  }
}

export default ToDo;
