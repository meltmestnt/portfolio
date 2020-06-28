import React, { Component } from "react";
import WeatherInfo from "./../components/WeatherInfo";
import WeatherInfoSubTitle from "../components/WeatherInfoSubTitle";
import { determineIcon } from "./../components/icons";
import AdditionalWeatherInfo from "../components/AdditionalWeatherInfo";
import { connect } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./../components/Spinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import withDegrees from "./../HOC/withDegrees";
dayjs.extend(relativeTime);

export class InfoCard extends Component {
  render() {
    let weatherStyles = {
      flexDirection: `${this.props.column ? "column" : "row"}`,
      padding: `0.5rem`,
      fontSize: `${this.props.column ? "1rem" : "2rem"}`,
    };
    let headerStyles = {
      color: "white",
      fontSize: `${this.props.column ? "1rem" : "1.8rem"}`,
      fontFamily: "Inconsolata",
      fontWeight: "300",
    };
    let icon = this.props.hour.description ? (
      determineIcon({ ...this.props.hour })
    ) : (
      <Spinner></Spinner>
    );

    const render =
      this.props.hour && Object.values(this.props.hour).length > 0 ? (
        <>
          <h1 style={headerStyles}>
            {this.props.header
              ? this.props.header
              : `${this.props.city}, ${this.props.country}`}
          </h1>
          <WeatherInfo
            icon={icon}
            degrees={this.props.degrees}
            styles={weatherStyles}
            togglers
          ></WeatherInfo>
          <WeatherInfoSubTitle
            subtitle={this.props.hour.description}
          ></WeatherInfoSubTitle>
          {this.props.additionalInfo && (
            <AdditionalWeatherInfo
              lastUpdate={dayjs(this.props.receivedAt).fromNow()}
              wind={this.props.hour.windSpeed}
              humidity={this.props.hour.humidity}
            ></AdditionalWeatherInfo>
          )}
        </>
      ) : null;
    return <div className="info-card">{render}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  let hour = null,
    receivedAt = state.receivedAt,
    city = state.city,
    country = state.country;
  if (state.hours && state.hours.size) {
    const stateHour = state.hours.entries().next().value[1][0];
    hour = {
      temp: stateHour.temp.toFixed(0),
      humidity: stateHour.humidity,
      windSpeed: `${stateHour.windSpeed.toFixed(0)}mph`,
      description: stateHour.description,
      icon: stateHour.icon,
    };
  } else {
    hour = {};
  }
  return {
    hour,
    receivedAt,
    city,
    country,
  };
};

export default connect(mapStateToProps, null)(withDegrees(InfoCard));
