import React from "react";

function AdditionalWeatherInfo(props) {
  return (
    <div className="additional-weather-info">
      <p className="weather-updated">Last updated {props.lastUpdate}</p>
      <div className="weather-info-wrapper">
        <p className="additional-wind">Wind &#9664; {props.wind}</p>

        <p className="additional-humidity">Humidity {props.humidity} </p>
      </div>
    </div>
  );
}

export default AdditionalWeatherInfo;
