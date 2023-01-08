import React, { Component } from "react";
import "./Product.css";
import { products } from "../../data/products";

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

function Product(props) {
  const productCards = products.map((product, index) => (
    <Card key={index} product={product} />
  ));
  const productCategory = props.category ? props.category : "<Category>";
  const productDescription = props.Description
    ? props.Description
    : "<Description>";
  return (
    <React.Fragment>
      <div className="productHeader">
        <div>{productCategory}</div>
        <div>{productDescription}</div>
      </div>
      <div className="productCards">{productCards}</div>
    </React.Fragment>
  );
}

export default Product;
