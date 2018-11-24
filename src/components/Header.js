import React from "react";

const Header = ({ as = "section", children, content }) =>
  React.createElement(as, {
    children: children || <h1>{content}</h1>,
    className: "header"
  });

export default Header;
