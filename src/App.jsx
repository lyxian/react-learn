import React, { Component } from "react";
import "./App.css";

import Button from "./components/Button";
import ThemeSwitcher from "./components/ThemeSwitcher";
// import ThemeSwitcher from "./components/ThemeSwitcher-1";

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>This is Heading 1.</h1>
        <Button />
        <p>I am a paragraph.</p>
        <ThemeSwitcher />
      </div>
    );
  }
}

export default App;
