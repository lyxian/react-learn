import React, { Component, useState } from "react";
import Cart from "./header/Cart";
import User from "./header/User";
import "./Header.css";

function Header(props) {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="header">
      <div className="title">TITLE</div>
      <div className="user">
        <User />
      </div>
      <div className="cart">
        <Cart />
      </div>
    </div>
  );
}

export default Header;
