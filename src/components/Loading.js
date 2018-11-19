import React from "react";
import loading from "./loading.svg";

const style = {
  position: "fixed",
  zIndex: 1000,
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,.65)',
  justifyContent: "center",
  alignItems: "center",
  transition: "all 2s"
};

const Loading = ({ active }) => (
  <div
    style={{
      ...style,
      display: active ? "flex" : "none",
      opacity: active ? 1 : 0
    }}
  >
    <div>
      <div className="loader">
        <div className="orbit">
          <div className="sun" />
          <div className="moon" />
        </div>

        <div className="loadfield">
          <div className="grass" />
          <img className="cow" alt="" src={loading} />
        </div>
      </div>
    </div>
  </div>
);

export default Loading;
