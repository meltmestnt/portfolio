import React from "react";
import GifGuide from "./GifGuide";
function NetworkError(props) {
  return (
    <div>
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
      <div
        style={{
          margin: "40px 0px",
          objectFit: "cover",
          maxWidth: "800px",
          maxHeight: "auto"
        }}
      >
        <GifGuide></GifGuide>
      </div>
    </div>
  );
}

export default NetworkError;
