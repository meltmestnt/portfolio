import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function ErrorView(props) {
  let err = props.error && props.error.message;
  console.dir(err);
  if (!err) {
    err = "Something went wrong";
  } else if (err === "Network Error") {
    err += ". Please refresh the page or wait some time.";
  }
  return (
    <div className="error-wrapper">
      <h1>{err}</h1>
      <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>
    </div>
  );
}

export default ErrorView;
