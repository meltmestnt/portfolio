import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import NetworkError from "./NetworkError";
function ErrorView(props) {
  let err = props.error && props.error.message;
  console.dir(err);
  let content = null;
  if (!err) {
    content = (
      <>
        <h1>{err}</h1>
        <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>
      </>
    );
  } else if (err === "Network Error") {
    content = <NetworkError></NetworkError>;
  }
  return <div className="error-wrapper">{content}</div>;
}

export default ErrorView;
