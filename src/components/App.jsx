import React, { Component } from "react";
import axios from "axios";
import "./index.css";

import ToDo from "./ToDo";
import Form from "./Form";
import FilterButton from "./FilterButton";

const localhost = process.env.LOCALHOST;

class App extends Component {
  // OR root.render(<App tasks=../>);
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: "todo-0", name: "Eat", completed: true },
        { id: "todo-1", name: "Sleep", completed: false },
        { id: "todo-2", name: "Repeat", completed: false },
      ],
      filter: "All",
    };
    // this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${localhost}/api/getAll`)
      .then((res) => {
        this.setState({
          tasks: res.data,
        });
      })
      .catch((err) => {
        console.log("Error in getting tasks");
      });
  }

  addTask(name) {
    const taskList = this.state.tasks;
    const newTask = { name, id: `todo-${taskList.length}`, completed: false };
    this.setState({
      tasks: taskList.concat(newTask),
    });
  }

  toggleTaskCompleted(id) {
    const updatedTasks = this.state.tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    this.setState({
      tasks: updatedTasks,
    });
  }

  deleteTask(id) {
    const remainingTasks = this.state.tasks.filter((task) => id !== task.id);
    this.setState({
      tasks: remainingTasks,
    });
  }

  editTask(id, newName) {
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
    return (
      <div className="todoapp stack-large">
        <h1>DIY To-Do List</h1>
        <Form
          addTask={this.addTask.bind(this)}
          count={this.state.tasks.length}
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
