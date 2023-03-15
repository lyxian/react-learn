import React, { Component } from "react";
import axios from "axios";
import "./index.css";

import ToDo from "./ToDo";
import Form from "./Form";
import FilterButton from "./FilterButton";

const localhost = process.env.LOCALHOST;
const port = process.env.PORT;

class App extends Component {
  // OR root.render(<App tasks=../>);
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: "All",
    };
    // this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${localhost}:${port}/api/getAll`)
      .then((res) => {
        this.setState({
          tasks: res.data,
        });
      })
      .catch((err) => {
        console.log("Error in getting tasks");
      });
  }

  addTask(newTask) {
    const taskList = this.state.tasks;
    // const newTask = { name, id: `todo-${taskList.length}`, completed: false };
    console.log(newTask);
    this.setState({
      tasks: taskList.concat(newTask),
    });
  }

  toggleTaskCompleted(id) {
    // Update DB
    var completed;
    const updatedTasks = this.state.tasks.map((task) => {
      if (id === task.id) {
        completed = !task.completed;
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this.setState({
      tasks: updatedTasks,
    });
    const data = { id, completed: completed };

    axios
      .post(`${localhost}:${port}/api/update`, data)
      .then((res) => {
        console.log(data);
      })
      .catch((err) => {
        alert("Error in updating task!");
        // console.log("Error in adding task!");
      });
  }

  deleteTask(id) {
    // Remove from DB
    const data = { id };

    axios
      .post(`${localhost}:${port}/api/delete`, data)
      .then((res) => {
        const remainingTasks = this.state.tasks.filter(
          (task) => id !== task.id
        );
        this.setState({
          tasks: remainingTasks,
        });
        console.log(res);
      })
      .catch((err) => {
        alert("Error in deleting task!");
        // console.log("Error in adding task!");
      });
  }

  editTask(id, newName) {
    // Update DB
    const data = { id, name: newName };

    console.log(data);
    axios
      .post(`${localhost}:${port}/api/update`, data)
      .then((res) => {
        const editedTaskList = this.state.tasks.map((task) => {
          // if this task has the same ID as the edited task
          if (id === task.id) {
            //
            return { ...task, name: newName };
          }
          return task;
        });
        this.setState({
          tasks: editedTaskList,
        });
      })
      .catch((err) => {
        alert("Error in updating task!");
        // console.log("Error in adding task!");
      });
  }

  setFilter(filter) {
    this.setState({
      filter: filter,
    });
  }

  render() {
    const FILTER_MAP = {
      All: () => true,
      Active: (task) => !task.completed,
      Completed: (task) => task.completed,
    };
    const FILTER_NAMES = Object.keys(FILTER_MAP);
    const filterList = FILTER_NAMES.map((name) => (
      <FilterButton
        key={name}
        name={name}
        isPressed={name === this.state.filter}
        setFilter={this.setFilter.bind(this)}
      />
    ));
    const taskList = this.state.tasks
      .filter(FILTER_MAP[this.state.filter])
      .map((task) => (
        <ToDo
          name={task.name}
          completed={task.completed}
          id={task.id}
          key={task.id}
          toggleTaskCompleted={this.toggleTaskCompleted.bind(this)}
          deleteTask={this.deleteTask.bind(this)}
          editTask={this.editTask.bind(this)}
        />
      ));
    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
    const headingText =
      `${taskList.length} ${tasksNoun} ` +
      (this.state.filter === "Completed" ? "completed" : "remaining");
    const last = this.state.tasks.length
      ? +this.state.tasks.slice(-1)[0].id.split("-").slice(-1) + 1
      : 0;
    return (
      <div className="todoapp stack-large">
        <h1>DIY To-Do List</h1>
        <Form
          addTask={this.addTask.bind(this)}
          count={this.state.tasks.length}
          last={last}
        />
        <div className="filters btn-group stack-exception">{filterList}</div>
        <h2 id="list-heading">{headingText}</h2>
        <ul
          role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </div>
    );
  }
}

export default App;
