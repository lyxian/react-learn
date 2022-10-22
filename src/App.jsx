import React, { Component } from "react";
import "./App.css";

import Button from "./components/Button";

// function Task(props) {
function Task({ props }) {
  // console.log(props);
  return <div className="todo">{props.text}</div>;
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
    { text: "Learn about React" },
    { text: "Meet friend for lunch" },
    { text: "Build really cool todo app" },
  ]);

  const addTask = (text) => {
    const newTasks = [...tasks, { text }];
    setTasks(newTasks);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {tasks.map((task, index) => (
          <Task key={index} index={index} props={task} />
        ))}
        <TaskForm addTask={addTask} />
      </div>
    </div>
  );
}

export default App;
