import React from "react";

function Spinner(props) {
  return (
    <div className={`lds-ring ${props.smallSpinner ? "small-spinner" : ""}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
