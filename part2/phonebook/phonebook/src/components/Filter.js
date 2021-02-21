import React from "react";

const Filter = (props) => (
  <div>
    The search word is{" "}
    <input value={props.value} onChange={props.handleSearch} />
  </div>
);

export default Filter;
