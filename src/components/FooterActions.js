import React from "react";

const FooterActions = ({ as = "div", children }) =>
  React.createElement(as, { children, className: "footer-actions" });

export default FooterActions;
