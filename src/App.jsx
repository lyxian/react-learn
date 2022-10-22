import React, { Component } from "react";
import "./App.css";

import Button from "./components/Button";

// function Task(props) {
function Task({ props, index, completedTask }) {
  // console.log(props);
  return (
    <div
      className="todo"
      style={{ textDecoration: props.isCompleted ? "line-through" : "" }}
    >
      {props.text}
      <div>
        <button onClick={() => completedTask(index)}>Complete</button>
      </div>
    </div>
  );
}

function TaskForm({ addTask }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [tasks, setTasks] = React.useState([
    { text: "Learn about React", isCompleted: false },
    { text: "Meet friend for lunch", isCompleted: false },
    { text: "Build really cool todo app", isCompleted: false },
  ]);

  const addTask = (text) => {
    const newTasks = [...tasks, { text }];
    setTasks(newTasks);
  };

  const completedTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = true;
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {tasks.map((task, index) => (
          <Task
            key={index}
            index={index}
            props={task}
            completedTask={completedTask}
          />
        ))}
        <TaskForm addTask={addTask} />
      </div>
    </div>
  );
}

export default App;
