import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AutoSuggest from "./../components/AutoSuggest";
import { Transition, animated } from "react-spring/renderprops";
import Spinner from "./Spinner";
import axios from "axios";
import { connect } from "react-redux";
import { grabData } from "./../redux/actions";
// to limit API calls

const limiter = () => {
  let canCall = true,
    idTimeout = null;
  return async func => {
    if (!canCall) {
      if (idTimeout) {
        clearTimeout(idTimeout);
      }
      idTimeout = setTimeout(() => {
        func().catch(e => console.log("Oops! Error", e));
        canCall = true;
      }, 500);
    }
    canCall = false;
  };
};
const limit = limiter();

// because we update state.input in callback after some time, i use this to always update with up-to-date input value
// otherwise it uses old state.input value when setTimeout was called

let input = "";

// component

function SearchField(props) {
  let [state, toggleSuggest] = React.useState({
    suggest: false,
    spinner: false,
    input: "",
    suggestions: []
  });

  // ref to access our input field with suggestions, and remove it when clicked outside

  const ref = React.createRef();

  // check if we clicked outside our input field or suggestions block

  const handleDocumentClick = ev => {
    if (ref.current && !ref.current.contains(ev.target)) {
      toggleSuggest({
        ...state,
        spinner: false,
        suggest: false
      });
    }
  };
  React.useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  });

  // making API call on input (input value > 3)

  React.useEffect(() => {
    if (!state.suggest) return;
    input = state.input;
    if (state.input.length < 3) {
      return;
    }
    limit(async () => {
      let res = await axios.get(
        `https://wft-geo-db.p.mashape.com//v1/geo/cities`,
        {
          params: {
            namePrefix: state.input
          },
          headers: {
            "X-Mashape-Key":
              "55de880fc7mshcc1d69d745ec59fp1c2cb7jsn2be7a85997c9"
          }
        }
      );
      toggleSuggest({
        ...state,
        input: input,
        suggestions: res.data.data.map(
          ({ city, country, longitude, latitude, region, id, countryCode }) => {
            return {
              city,
              country,
              longitude,
              latitude,
              region,
              id,
              countryCode
            };
          }
        )
      });
    });
  }, [state]);

  // when suggestion clicked
  const suggestionClicked = (long, lat) => {
    props.grabData(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=578100bd6668f4ff66da810dade78836`
    );
    toggleSuggest({
      ...state,
      spinner: false,
      suggest: false
    });
  };

  return (
    <div
      className="input-wrapper"
      ref={ref}
      style={props.styles ? props.styles : {}}
    >
      <input
        onChange={e => {
          toggleSuggest({
            ...state,
            spinner: true,
            input: e.target.value
          });
        }}
        onFocus={() => {
          toggleSuggest({
            ...state,

            suggest: true
          });
        }}
        placeholder={props.placeh}
        type="text"
        className="input-search"
        value={state.input}
      />
      {state.spinner ? (
        <div
          className="spinner-wrapper input-icon"
          style={{ width: "35px", height: "35px" }}
        >
          <Spinner smallSpinner></Spinner>
        </div>
      ) : (
        <FontAwesomeIcon
          className="input-icon"
          icon={faSearch}
        ></FontAwesomeIcon>
      )}

      <Transition
        items={state.suggest}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0 }}
      >
        {item =>
          item
            ? props => (
                <animated.div
                  className="suggest-container"
                  style={{ ...props }}
                >
                  <AutoSuggest
                    suggestions={state.suggestions}
                    input={state.input}
                    clickHandler={suggestionClicked}
                  ></AutoSuggest>
                </animated.div>
              )
            : null
        }
      </Transition>
    </div>
  );
}

const mapDispatchToProps = {
  grabData
};

export default connect(null, mapDispatchToProps)(SearchField);
