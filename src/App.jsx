import React from "react";
import socketIO from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Home from "./components/Home";
import "./App.css";

const socket = socketIO.connect(`${process.env.LOCALHOST}:4000`);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Main socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
