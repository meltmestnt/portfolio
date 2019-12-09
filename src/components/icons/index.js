import ClearNight from "./ClearNight";
import Cloudy from "./Cloudy";
import CloudyLightning from "./CloudyLightning";
import CloudyMoon from "./CloudyMoon";
import CloudyRainLightning from "./CloudyRainLightning";
import CloudySun from "./CloudySun";
import Rainy from "./Rainy";
import Snowy from "./Snowy";
import Sunny from "./Sunny";
import SunnyWind from "./SunnyWind";
const obj = {
  "clear sky": Sunny,
  "clear night": ClearNight,
  "few clouds": CloudySun,
  "overcast clouds": Cloudy,
  "overcast clouds night": CloudyMoon,
  "few clouds night": CloudyMoon,
  "scattered clouds": Cloudy,
  "broken clouds": Cloudy,
  "shower rain": CloudyRainLightning,
  rain: Rainy,
  "light rain": Rainy,
  thunderstorm: CloudyLightning,
  snow: Snowy,
  mist: SunnyWind
};
export default obj;

export const determineIcon = ({ description, icon }) => {
  if (description === "clear sky") {
    return icon === "01d" ? Sunny : ClearNight;
  } else if (description === "few clouds") {
    return icon === "02d" ? CloudySun : CloudyMoon;
  } else if (description === "overcast clouds") {
    return icon === "04d" ? Cloudy : CloudyMoon;
  } else if (description.indexOf("snow") !== -1) {
    return Snowy;
  } else {
    return obj[description];
  }
};
