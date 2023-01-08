import React, { Component } from "react";
import "./Product.css";
import { products, categories } from "../../data/products";
import { CategoryContext } from "../../App";

function Card(props) {
  const image =
    props.product.image === "NA" ? (
      <div>{props.product.image}</div>
    ) : (
      <img src={props.product.image} />
    );
  return (
    <div className="card">
      <a>
        <div className="card-inner">
          <div className="card-left">{image}</div>
          <div className="card-right">
            <div className="card-right-top">
              <h3>{props.product.title}</h3>
              <div>{props.product.description}</div>
            </div>
            <div className="card-right-btm">
              <h3>S${props.product.price}</h3>
              <button>
                <h4>Add</h4>
              </button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

function Product() {
  const productCategory = React.useContext(CategoryContext)[0];
  const productDescription = categories[productCategory];
  const FILTER_MAP = {
    Mains: (product) => product.category === "Mains",
    Sides: (product) => product.category === "Sides",
    Beverage: (product) => product.category === "Beverage",
  };
  const productCards = products
    .filter(FILTER_MAP[productCategory])
    .map((product, index) => <Card key={index} product={product} />);
  return (
    <React.Fragment>
      <div className="productHeader">
        <h2>{productCategory}</h2>
        <h4>{productDescription}</h4>
      </div>
      <div className="productCards">{productCards}</div>
    </React.Fragment>
  );
}

export default Product;
