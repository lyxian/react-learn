import React, { Component } from "react";
import "./App.css";

function Task(props) {
  const taskStyle = props.isCompleted ? "line-through" : "";
  return (
    <div className="todo" style={{ textDecoration: taskStyle }}>
      {props.text}
      <div>
        <button onClick={() => props.completeTask(props.index)}>
          Complete
        </button>
        <button onClick={() => props.removeTask(props.index)}></button>
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
            text={task.text}
            isCompleted={task.isCompleted}
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
