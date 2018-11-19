import React from "react";

const Stack = ({ data, onClick }) => (
  <div className="stack-section" style={{ overflow: "hidden" }}>
    <div
      className="clearfix well r-p0 r-m0"
      tabIndex={0}
      style={{ cursor: "pointer" }}
      role="button"
      onClick={onClick}
      onKeyPress={({ key }) => {
        if (key === "Enter") onClick();
      }}
    >
      <div className="header-left " style={{ marginLeft: 10, float: "none" }}>
        <h4 className="divider clip stack-link" title={data.name}>
          {data.name}
        </h4>
      </div>
    </div>
  </div>
);

export default Stack;
