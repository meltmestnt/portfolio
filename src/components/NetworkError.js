import React from "react";
import GifGuide from "./GifGuide";
function NetworkError(props) {
  return (
    <div>
      <p>
        This is not your fault! Please, enable mixed content to get rid of this
        error. This error occurs because i use OpenWeather MAP API that uses
        HTTP instead of HTTPS.
        <br></br>
        <a
          className="highlighted-link"
          href="https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content"
        >
          More about mixed content.
        </a>
      </p>
      <GifGuide></GifGuide>
    </div>
  );
}

export default NetworkError;
