import React, { Component } from "react";
import "./Product.css";

function Product(props) {
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
      <div className="productCards">
        <div className="card">
          <div className="card-inner">
            <div>Title</div>
            <div>Image</div>
            <div>Description</div>
            <div>Price</div>
            <button>Add</button>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div>Title</div>
            <div>Image</div>
            <div>Description</div>
            <div>Price</div>
            <button>Add</button>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div>Title</div>
            <div>Image</div>
            <div>Description</div>
            <div>Price</div>
            <button>Add</button>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div>Title</div>
            <div>Image</div>
            <div>Description</div>
            <div>Price</div>
            <button>Add</button>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <div>Title</div>
            <div>Image</div>
            <div>Description</div>
            <div>Price</div>
            <button>Add</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Product;
