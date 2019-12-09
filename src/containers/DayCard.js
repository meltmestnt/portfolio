import React from "react";
import WeatherInfo from "./../components/WeatherInfo";
import WeatherInfoSubTitle from "../components/WeatherInfoSubTitle";
import { selectDay } from "./../redux/actions";
import { connect } from "react-redux";
import { determineIcon } from "./../components/icons";
import Spinner from "../components/Spinner";
import withDegrees from "./../HOC/withDegrees";
function DayCard(props) {
  let weatherStyles = {
    flexDirection: "column",
    padding: "0.5rem",
    fontSize: "1rem"
  };
  const icon = props.icon ? determineIcon(props) : <Spinner></Spinner>;

  return (
    <div
      className={`day-card ${props.active === props.day ? "active-card" : ""}`}
      onClick={() => {
        props.selectDay(props.day);
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "1rem",
          fontFamily: "Inconsolata",
          fontWeight: "300"
        }}
      >
        {props.weekDay}
      </h1>
      <WeatherInfo
        icon={icon}
        degrees={props.degrees}
        styles={weatherStyles}
      ></WeatherInfo>
      <WeatherInfoSubTitle
        styles={{ fontSize: "0.95rem" }}
        subtitle={props.description}
      ></WeatherInfoSubTitle>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  let day = ownProps.day;
  const dayInfo = state.hours && state.hours[day];
  return {
    weekDay: dayInfo[0].weekDay,
    hour: {
      temp:
        day === Object.keys(state.hours)[0]
          ? dayInfo[0].temp.toFixed(0)
          : (
              dayInfo.reduce((p, c, i, arr) => {
                if (arr.length === 1) return p;
                return p + c.temp;
              }, dayInfo[0].temp) / dayInfo.length
            ).toFixed(0)
    },
    icon:
      day === Object.keys(state.hours)[0]
        ? dayInfo[0].icon
        : dayInfo.length > 1
        ? dayInfo[(dayInfo.length / 2).toFixed(0)].icon
        : dayInfo[0].icon,
    description:
      day === Object.keys(state.hours)[0]
        ? dayInfo[0].description
        : dayInfo.length > 1
        ? dayInfo[(dayInfo.length / 2).toFixed(0)].description
        : dayInfo[0].description
  };
};

const mapDispatchToProps = {
  selectDay
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDegrees(DayCard));
