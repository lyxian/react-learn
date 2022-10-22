import React, { Component } from "react";
import "./App.css";

import Button from "./components/Button";

// function Task(props) {
function Task({ props, index, completeTask, removeTask }) {
  // console.log(props);
  return (
    <div
      className="todo"
      style={{ textDecoration: props.isCompleted ? "line-through" : "" }}
    >
      {props.text}
      <div>
        <button onClick={() => completeTask(index)}>Complete</button>
        <button onClick={() => removeTask(index)}>x</button>
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

  const completeTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = true;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
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
            completeTask={completeTask}
            removeTask={removeTask}
          />
        ))}
        <TaskForm addTask={addTask} />
      </div>
    </div>
  );
}

export default App;
