import React from "react";
import GifGuide from "./GifGuide";
function NetworkError(props) {
  return (
    <div className="network-error">
      <p>
        Please, enable "Insecure content" option to be able to fetch weather
        data from OpenWeatherMap (they use http as i couldn't find free API that
        uses https) while Netlify uses https. Because i host https and use http
        API chrome block this by default.
      </p>
      <br />
      <a href="https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content">
        More about mixed content.
      </a>
      <div className="network-error-image">
        <GifGuide></GifGuide>
      </div>
    </div>
  );
}

export default NetworkError;
