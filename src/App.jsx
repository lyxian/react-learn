import React, { Component } from "react";
import "./App.css";

import Button from "./components/Button";

class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>This is Heading 1.</h1>
        <Button />
        <p>I am a paragraph.</p>
      </div>
    );
  }
}

export default App;
