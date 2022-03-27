import React, { useState } from "react";
import axios from "axios";

export default function Search() {
  let [city, setCity] = useState("");
  const [cityName, setCityName] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumiidty] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);
  const [date, setDate] = useState(null);
  const [isShowingFahrenheit, setIsShowingFahrenheit] = useState(false);

  function updateData(response) {
    console.log(response);
    console.log(response);
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumiidty(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);
    setCityName(response.data.name);

    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[now.getDay()];
    setDate(`${day} ${hours}:${minutes}`);
  }

  function fetchData(city) {
    let apiKey = "fc6aaa11eb87ef192ffff5b3c7cdceb9";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(updateData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetchData(city);
  }

  function handleInputChange(event) {
    setCity(event.target.value);
  }

  function handleFahrenheitClick() {
    setIsShowingFahrenheit(true);
  }

  function handleCelsiusClick() {
    setIsShowingFahrenheit(false);
  }

  let fahrenheit = temperature * 1.8 + 32;

  return (
    <div className="Weather">
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a city"
            onChange={handleInputChange}
          />
          <input type="submit" value="Search" className="btn btn-primary" />
        </div>
      </form>
      <div className="row">
        {temperature !== null &&
        description !== null &&
        humidity !== null &&
        wind !== null &&
        cityName !== null &&
        icon !== null ? (
          <div className="row">
            <div className="col-6">
              <div className="overview">
                <h1>{cityName}</h1>
                <div>Last updated: {date}</div>
              </div>
              <div>
                Temperature:{" "}
                {Math.round(isShowingFahrenheit ? fahrenheit : temperature)}{" "}
                <span
                  className={isShowingFahrenheit ? "unit" : "unit fw-bold"}
                  onClick={handleCelsiusClick}
                >
                  °C
                </span>{" "}
                |{" "}
                <span
                  className={isShowingFahrenheit ? "unit fw-bold" : "unit"}
                  onClick={handleFahrenheitClick}
                >
                  °F
                </span>
              </div>
              <div>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
              </div>
            </div>
            <div className="col-6">
              <div>Description: {description}</div>
              <div>Humidity: {humidity}</div>
              <div>Wind: {wind}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
