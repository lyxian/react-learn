import React, { Component } from "react";
import "./App.css";

import Button from "./components/Button";

class App extends Component {
  render() {
    return (
      <div id="container">
        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1536323760109-ca8c07450053"
            alt="Lago di Braies"
          />

          <div className="card__details">
            <span className="tag">Nature</span>

            <span className="tag">Lake</span>

            <div className="name">Lago di Braies</div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Consectetur sodales morbi dignissim sed diam pharetra vitae ipsum
              odio.
            </p>

            <button>Read more</button>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeDialog;

// The CSS Box Model
// Padding: Space outside the content
// - padding: topValue rightValue bottomValue leftValue;
// - padding: verticalValue horizontalValue;
// Border: Lines outside the padding
// - border: widthValue styleValue colorValue;
// Margin: Space outside the border
// - margin: topValue rightValue bottomValue leftValue;
// - margin: verticalValue horizontalValue;
