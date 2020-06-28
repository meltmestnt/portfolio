import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  SELECT_DAY,
  weekdays,
  CHANGE_TEMPERATURE,
} from "../constants";
import axios from "axios";
import dayjs from "dayjs";

export const changeTemperature = (tempType) => {
  return {
    type: CHANGE_TEMPERATURE,
    tempType,
  };
};
export const fetchDataStart = () => {
  return {
    type: FETCH_DATA_START,
  };
};
export const fetchSuccess = (data) => {
  return {
    type: FETCH_DATA_SUCCESS,
    receivedAt: Date.now(),
    data,
  };
};
export const fetchError = (err) => {
  return {
    type: FETCH_DATA_ERROR,
    err,
  };
};

export const selectDay = (day) => {
  return {
    type: SELECT_DAY,
    day,
  };
};

// thunk
export const grabData = (url) => {
  return async (dispatch) => {
    dispatch(fetchDataStart());
    let res, body;
    try {
      res = await axios.get(url, { crossdomain: true });
    } catch (error) {
      dispatch(fetchError(error));
      return;
    }

    if (res && res.status === 200) {
      body = formatState(res.data);
    } else {
      dispatch(fetchError(new Error("Unable to fetch data")));
      return;
    }
    dispatch(fetchSuccess(body));
  };
};

const formatState = ({ city, list }) => {
  let hours = new Map();
  let country = city.country;
  let cityName = city.name;
  list.forEach((item, i) => {
    let date = dayjs(item.dt_txt);

    let hour = {
      hour: date.hour(),
      weekDay: weekdays[date.day()],

      temp: item.main.temp - 273.15,
      windSpeed: item.wind.speed * 2.237,
      humidity: `${item.main.humidity}%`,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    };
    hours.has(date.date())
      ? hours.get(date.date()).push(hour)
      : hours.set(date.date(), [hour]);
  });
  console.log("Map hours", hours);
  console.log("ENTRIES", hours.entries());
  return {
    hours,
    cityName,
    country,
  };
};
