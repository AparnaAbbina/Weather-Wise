"use client";
import "./page.css";
import Header from "./Header/Header.jsx";
import WeatherData from "./WeatherData/WeatherData.jsx";
import WeatherImg from "./WeatherImg/WeatherImg.jsx";
import WeeklyWeather from "./WeeklyWeather/WeeklyWeather.jsx";
import { useState } from "react";

export default function Home() {
  const [cityName, setInputValue] = useState("");
  const [placename, setName] = useState("");
  const [data, setData] = useState(null);
  const [cloud, setCloud] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windspeed, setWindspeed] = useState(null);
  const [weatherImage, setWeatherImage] = useState(null);
  const [country, setCountry] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(
    "Please enter a city name or town name to get weather data."
  );

  const getData = async (event) => {
    event.preventDefault();
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (cityName) {
      try {
        // Fetch the current weather data for the Cityname/townname searched by user
        const responseOne = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
        );

        if (!responseOne.ok) {
          throw new Error("Failed to fetch current weather data");
        }

        const dataOne = await responseOne.json();

        setData(dataOne.main.temp);
        setCloud(dataOne.weather[0].description);
        setHumidity(dataOne.main.humidity);
        setWindspeed(dataOne.wind.speed);
        setCountry(dataOne.sys.country);
        setTimestamp(dataOne.dt);
        setName(dataOne.name);
        const image = `http://openweathermap.org/img/wn/${dataOne.weather[0].icon}.png`;
        setWeatherImage(image);

        const { lat, lon } = dataOne.coord;

        // Fetch the one-week weather data
        const responseTwo = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        if (!responseTwo.ok) {
          throw new Error("Failed to fetch weekly weather data");
        }

        const dataTwo = await responseTwo.json();
        setWeeklyData(dataTwo);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage("Please enter a valid City name or Town name");
    }
  };

  return (
    <main className="content">
      <Header
        cityName={cityName}
        setInputValue={setInputValue}
        getData={getData}
      />
      {errorMessage ? (
        <div className="error-message">
          <b>{errorMessage}</b>
        </div>
      ) : (
        <div className="dataContainer">
          <div className="card">
            <WeatherImg
              image={weatherImage}
              temp={data}
              placename={placename}
              country={country}
            />
            <WeatherData
              cloud={cloud}
              humidity={humidity}
              windspeed={windspeed}
              timestamp={timestamp}
            />
            <div className="weeklyContainer">
              <WeeklyWeather weeklyData={weeklyData} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
