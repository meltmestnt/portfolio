import React from "react";

function AutoSuggest(props) {
  let render =
    props.suggestions.length > 0 ? (
      props.suggestions.map(suggestion => (
        <a href="#" key={suggestion.id}>
          <div
            className="suggestion"
            onClick={() =>
              props.clickHandler(suggestion.longitude, suggestion.latitude)
            }
          >
            <div className="suggestion-info">
              <h1>{suggestion.city}</h1>
              <p>
                {suggestion.country}, {suggestion.region}
              </p>
            </div>
            <img
              className="suggestion-icon"
              src={`https://www.countryflags.io/${suggestion.countryCode}/flat/32.png`}
              alt=""
            />
          </div>
        </a>
      ))
    ) : props.input.length > 0 ? (
      <a href="#">
        <h1>Please, wait</h1>
      </a>
    ) : (
      <a href="#">
        <h1>Type city name</h1>
      </a>
    );
  return <div>{render}</div>;
}

export default AutoSuggest;
