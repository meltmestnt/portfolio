import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  SELECT_DAY,
  CHANGE_TEMPERATURE
} from "../constants";

export default function weather(
  state = {
    temperature: "C",
    hours: [],
    isFetching: false,
    error: "",
    city: "",
    country: "",
    receivedAt: null,
    currentDay: null
  },
  action
) {
  switch (action.type) {
    case CHANGE_TEMPERATURE:
      return {
        ...state,
        temperature:
          action.tempType === "C" ? "C" : action.tempType === "F" ? "F" : null
      };
      break;
    case FETCH_DATA_START:
      return {
        ...state,
        isFetching: true
      };
      break;
    case SELECT_DAY:
      return {
        ...state,
        currentDay: {
          day: action.day,
          hours: [...state.hours[action.day]]
        }
      };
      break;
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        city: action.data.cityName,
        country: action.data.country,
        hours: action.data.hours,
        isFetching: false,
        receivedAt: action.receivedAt,
        currentDay: {
          day: Object.keys(action.data.hours)[0],
          hours: action.data.hours[Object.keys(action.data.hours)[0]]
        }
      };
      break;
    case FETCH_DATA_ERROR:
      return {
        isFetching: false,
        error: action.err
      };
      break;
    default:
      return state;
  }
}
