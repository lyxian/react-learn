import React, { Component, useState } from "react";
import Category from "./body/Category";
import Product from "./body/Product";
// import "./Body.css";

function Body(props) {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="body">
      <div className="category">
        <Category />
      </div>
      <div className="product">
        <Product />
      </div>
    </div>
  );
}

export default Body;
