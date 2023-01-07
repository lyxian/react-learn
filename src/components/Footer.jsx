import React, { Component, useState } from "react";
import Details from "./footer/Details";
import "./Footer.css";

function Footer(props) {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="footer">
      <Details />
    </div>
  );
}

export default Footer;
