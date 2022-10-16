import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
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
    const ShowBookDetailsWrapper = (props) => {
      const navigate = useNavigate();
      const params = useParams();
      console.log(params);
      return (
        <ShowBookDetails
          navigate={navigate}
          {...{ ...props, match: { params } }}
        />
      );
    };
    const UpdateBookInfoWrapper = (props) => {
      const navigate = useNavigate();
      const params = useParams();
      console.log(params);
      return (
        <UpdateBookInfo
          navigate={navigate}
          {...{ ...props, match: { params } }}
        />
      );
    };
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={Home()} />
          <Route path="/show-books" element={<ShowBookList />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route
            path="/edit-book/:id"
            element={<UpdateBookInfoWrapper history={this.props.history} />}
          />
          <Route path="/show-books/:id" element={<ShowBookDetailsWrapper />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
