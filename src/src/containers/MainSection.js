import React, { Component } from "react";
import InfoCard from "./InfoCard";
import { connect } from "react-redux";
import { grabData } from "./../redux/actions";
import Spinner from "./../components/Spinner";
import Chart from "../components/Chart";
import ErrorBoundary from "./ErrorBoundary";
import DayCard from "./DayCard";
import ErrorView from "./../components/ErrorView";
import { Trail, Transition, animated } from "react-spring/renderprops";
import { config, interpolate } from "react-spring";
export class MainSection extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.props.grabData(`
        http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=578100bd6668f4ff66da810dade78836
        `);
      }
    );
    navigator.permissions
      ? navigator.permissions
          .query({
            name: `geolocation`
          })
          .then(perm => {
            perm.state === "granted"
              ? navigator.geolocation.getCurrentPosition(
                  ({ coords: { latitude, longitude } }) => {
                    this.props.grabData(`
        http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=578100bd6668f4ff66da810dade78836
        `);
                  }
                )
              : this.props.grabData(
                  `http://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=578100bd6668f4ff66da810dade78836`
                );
          })
      : this.props.grabData(
          `http://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=578100bd6668f4ff66da810dade78836`
        );
  }
  render() {
    let graph =
      Object.entries(this.props.hours).length > 0 ? (
        <Chart
          isFetching={this.props.isFetching}
          data={collectData(this.props.hours, this.props.currentDay)}
        ></Chart>
      ) : (
        <div className="spinner-wrapper">
          <Spinner></Spinner>
        </div>
      );
    const error = this.props.error;
    const mainRender = (
      <div className="main-section">
        <div className="container">
          {error ? (
            <ErrorView error={error}></ErrorView>
          ) : (
            <ErrorBoundary>
              <div className="row center-xs">
                <div className="col-xs-12 center-xs">
                  <InfoCard additionalInfo></InfoCard>
                  {graph}
                </div>
              </div>
              <div className="row around-xs" style={{ padding: "2rem 0rem" }}>
                <Trail
                  native
                  items={Object.entries(this.props.hours)}
                  keys={item => item[0]}
                  from={{ y: 50, opacity: 0 }}
                  to={{
                    y: 0,
                    opacity: 1
                  }}
                  reset={this.props.isFetching}
                >
                  {item => ({ opacity, y }) => {
                    return (
                      <animated.div
                        style={{
                          opacity,
                          transform: y.interpolate(y => `translateY(${y}px)`),
                          flexGrow: "1",
                          flexShrink: "0",
                          flexBasis: "0px"
                        }}
                      >
                        <DayCard
                          active={this.props.currentDay.day}
                          day={item[0]}
                        ></DayCard>
                      </animated.div>
                    );
                  }}
                </Trail>
              </div>
            </ErrorBoundary>
          )}
        </div>
      </div>
    );
    return mainRender;
  }
}

const collectData = (hours, currentDay) => {
  const data = [];
  currentDay.hours.forEach((h, i) => {
    if (data.length < 8) {
      data.push(h);
    }
  });

  if (data.length < 8) {
    let day = `${+currentDay.day + 1}`;
    if (hours[day]) {
      hours[day].forEach(day => {
        if (data.length < 8) {
          data.push(day);
        }
      });
    }
  }

  return data;
};

const mapDispatchToProps = {
  grabData
};

const mapStateToProps = state => {
  return {
    hours: { ...state.hours },
    currentDay: { ...state.currentDay },
    error: state.error,
    isFetching: state.isFetching
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainSection);
