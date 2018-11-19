import React from "react";
import cn from "classnames";

const Button = ({ loading, content, primary, link, onClick, ...props }) => (
  <button
    className={cn("btn", {
      "btn-primary": primary,
      "btn-link": link,
      "btn-info": loading
    })}
    disabled={props.disabled || loading}
    onClick={onClick}
  >
    {content}
  </button>
);

export default Button;
