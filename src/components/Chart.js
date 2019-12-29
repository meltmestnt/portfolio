import React from "react";
import ReactDOM from "react-dom";
import { ResponsiveLine } from "@nivo/line";
import dayjs from "dayjs";
import { determineIcon } from "./icons";
import { Spring, animated } from "react-spring/renderprops";
import { config } from "react-spring";
import withDegrees from "./../HOC/withDegrees";
function Chart(props) {
  return (
    <Spring
      reset={props.isFetching}
      from={{ width: "0%" }}
      to={{ width: "100%" }}
      config={config.slow}
      delay={500}
    >
      {prop => (
        <animated.div
          style={{
            ...prop,
            position: "relative",
            zIndex: 9999,
            overflow: "hidden"
          }}
        >
          <div className="chart-wrapper">
            <ResponsiveLine
              data={[initializeData(props)]}
              margin={{ top: 50, right: 20, bottom: 125, left: 20 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false
              }}
              axisTop={null}
              axisRight={null}
              curve={"natural"}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 90,
                tickRotation: 0,
                legendOffset: 36,
                legendPosition: "middle"
              }}
              axisLeft={null}
              enablePointLabel
              pointLabel="y"
              pointLabelYOffset={-19}
              colors={{ scheme: "greys" }}
              pointSize={6}
              lineWidth={2}
              enableArea={true}
              areaOpacity={0.3}
              pointBorderWidth={8}
              pointColor={{ theme: "background" }}
              pointBorderColor={{ from: "serieColor" }}
              enableGridX={false}
              enableGridY={false}
            ></ResponsiveLine>
          </div>
          <div className="hourly-icons">
            {props.data.map(hour => {
              let Icon = determineIcon(hour);

              return <Icon></Icon>;
            })}
          </div>
        </animated.div>
      )}
    </Spring>
  );
}

const initializeData = ({ data, temperature, toFahrenheit }) => {
  const dataObj = {
    id: dayjs().date(),
    data: data.map(hour => ({
      x:
        hour.hour < 12
          ? hour.hour + "am"
          : hour.hour == 12
          ? hour.hour + "pm"
          : hour.hour - 12 + "pm",
      y: temperature === "C" ? +hour.temp.toFixed(0) : toFahrenheit(+hour.temp)
    }))
  };
  return dataObj;
};

export default withDegrees(Chart);
