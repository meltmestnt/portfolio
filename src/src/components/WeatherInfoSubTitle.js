import React from "react";

function WeatherInfoSubTitle(props) {
  return (
    <div className="weather-info-subtitle">
      <h1 className="subtitle" style={props.styles || {}}>
        {props.subtitle &&
          props.subtitle.slice(0, 1).toUpperCase() +
            props.subtitle.slice(1, props.subtitle.length)}
      </h1>
    </div>
  );
}

export default WeatherInfoSubTitle;
