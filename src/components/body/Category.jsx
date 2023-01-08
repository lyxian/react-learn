import React, { Component } from "react";
import "./Category.css";
import { CategoryContext } from "../../App";
import { categories } from "../../data/products";

function Category() {
  const [category, setCategory] = React.useContext(CategoryContext); // valus is not defined -> setState new data type does not match old data type
  const Categories = Object.keys(categories);

  return (
    <React.Fragment>
      {Categories.map((Category, index) => (
        <button
          key={index}
          type="button"
          className="categoryButton"
          onClick={() => setCategory(Category)}
        >
          <h4>{Category}</h4>
        </button>
      ))}
    </React.Fragment>
  );
}

export default Category;
