import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

import CreateBook from "./components/CreateBook";
import ShowBookList from "./components/ShowBookList";
import ShowBookDetails from "./components/ShowBookDetails";
import UpdateBookInfo from "./components/UpdateBookInfo";

function Home() {
  return (
    <div>
      <h1>This is the home page</h1>
      <Link to="/show-books">Show Books</Link>
      <br />
      <Link to="/create-book">Create Book</Link>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Home()} />
          <Route path="/show-books" element={<ShowBookList />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
          <Route path="/show-book/:id" element={<ShowBookDetails />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
