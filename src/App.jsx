import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      <Link to="about">Click to view our about page</Link>
      <br />
      <Link to="contact">Click to view our contact page</Link>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>This is the about page</h1>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1>This is the contact page</h1>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={Home()} />
            <Route path="about" element={About()} />
            <Route path="contact" element={Contact()} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
