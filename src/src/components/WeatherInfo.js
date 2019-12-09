import React from "react";
import Togglers from "./Togglers";
function WeatherInfo(props) {
  let Icon = props.icon || null;
  return (
    <div className="weather-card-info" style={props.styles || {}}>
      <div className="weather-card-icon">
        <Icon />
      </div>
      <h1 className="weather-card-degrees">{props.degrees}</h1>
      {props.togglers && <Togglers></Togglers>}
    </div>
  );
}

export default WeatherInfo;
