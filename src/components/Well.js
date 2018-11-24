import React from "react";

const Well = ({ as = "div", children }) =>
  React.createElement(as, { children, className: "well" });

export default Well;
