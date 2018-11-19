import React from "react";

const Search = props => (
  <input
    className="form-control input-sm ember-view ember-text-field"
    placeholder="Search..."
    autoFocus
    {...props}
  />
);
export default Search;
