import React, { Component } from "react";
import "./index.css";

import ToDo from "./ToDo";
import Form from "./Form";
import FilterButton from "./FilterButton";

// function addTask(name) {
//   alert(name);
// }

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
    };
    // this.addTask = this.addTask.bind(this);
  }

  addTask(name) {
    const taskList = this.state.tasks;
    const newTask = { name, id: `todo-${taskList.length}`, completed: false };
    this.setState({
      tasks: taskList.concat(newTask),
    });
  }

  render() {
    const taskList = this.state.tasks.map((task) => (
      <ToDo
        name={task.name}
        completed={task.completed}
        id={task.id}
        key={task.id}
      />
    ));
    const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
    const headingText = `${taskList.length} ${tasksNoun} remaining`;
    return (
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={this.addTask.bind(this)} />
        <div className="filters btn-group stack-exception">
          <FilterButton />
          <FilterButton />
          <FilterButton />
        </div>
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
