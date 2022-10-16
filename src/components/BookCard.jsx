import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const BookCard = (props) => {
  const book = props.book;

  return (
    <div className="card-container">
      <img
        src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/8466/9781846685828.jpg"
        alt=""
      />
      <div className="desc">
        <h2>
          <Link to={`/show-books/${book._id}`}>{book.title}</Link>
        </h2>
        <h3>{book.author}</h3>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;
