import React from "react";
import GifGuide from "./GifGuide";
function NetworkError(props) {
  return (
    <div className="network-error">
      <p>
        This is not your fault! Please, enable mixed content to get rid of this
        error. This error occurs because i use OpenWeather MAP API that uses
        HTTP instead of HTTPS.
      </p>
      <br />
      <a
        className="highlighted-link"
        href="https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content"
      >
        More about mixed content.
      </a>
      <div className="network-error-image">
        <GifGuide></GifGuide>
      </div>
    </div>
  );
}

export default NetworkError;
