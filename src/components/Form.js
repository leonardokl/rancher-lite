import React from "react";

const Form = {};

const Input = ({ label, ...props }) => (
  <div>
    <div className="form-label">
      <label className="form-control-static">{label}{props.required && '*'}</label>
    </div>
    <input className="form-control" {...props} />
  </div>
);

Form.Input = Input;

export default Form;
