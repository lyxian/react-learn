import React, { Component } from "react";
import "./App.css";

// import Button from "./components/Button";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="app">
        {/* <h1>This is Heading 1.</h1> */}
        {/* <Button /> */}
        {/* <p>I am a paragraph.</p> */}
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
