import React from "react";
import { connect } from "react-redux";

export default function(component) {
  return connect(mapStateToProps)(createHOC(component));
}

const mapStateToProps = state => {
  return {
    temperature: state.temperature
  };
};

const createHOC = Component => {
  return class extends React.Component {
    render() {
      let degrees = 0;
      if (this.props.hour) {
        if (this.props.temperature === "C") {
          degrees = +this.props.hour.temp;
        } else {
          degrees = toFahrenheit(+this.props.hour.temp);
        }
      }
      return (
        <Component
          {...this.props}
          toFahrenheit={toFahrenheit}
          degrees={degrees}
        ></Component>
      );
    }
  };
};

const toFahrenheit = temp => {
  return (temp * (9 / 5) + 32).toFixed(0);
};
