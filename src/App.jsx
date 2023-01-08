import React, { Component } from "react";
import "./App.css";

// import Button from "./components/Button";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

export const CategoryContext = React.createContext();

function App() {
  const [category, setCategory] = React.useState("Mains");

  return (
    <div className="app">
      {/* <h1>This is Heading 1.</h1> */}
      {/* <Button /> */}
      {/* <p>I am a paragraph.</p> */}
      <CategoryContext.Provider value={[category, setCategory]}>
        <Header />
        <Body />
        <Footer />
      </CategoryContext.Provider>
      {/* <button onClick={() => setCategory({ category: value })}>TEST</button> */}
    </div>
  );
}

export default App;
