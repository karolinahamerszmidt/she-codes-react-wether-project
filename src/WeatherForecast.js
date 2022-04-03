import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast({ lat, lon }) {
  let [forecast, setForecast] = useState(null);

  function updateData(response) {
    console.log(response);
    setForecast(response.data.daily);
  }

  useEffect(() => {
    if (lat === null || lon === null) return;

    let apiKey = "fc6aaa11eb87ef192ffff5b3c7cdceb9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateData);
  }, [lat, lon]);

  if (forecast === null) return null;

  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col">
          <WeatherForecastDay data={forecast[0]} />
        </div>
        <div className="col">
          <WeatherForecastDay data={forecast[1]} />
        </div>
        <div className="col">
          <WeatherForecastDay data={forecast[2]} />
        </div>
        <div className="col">
          <WeatherForecastDay data={forecast[3]} />
        </div>
      </div>
    </div>
  );
}
