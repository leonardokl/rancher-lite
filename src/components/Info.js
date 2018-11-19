import React from "react";

const Info = ({ label, value }) => (
  <div>
    <label class="block">{label}</label>
    <div>{value}</div>
  </div>
);

export default Info;
