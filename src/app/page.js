"use client";
import "./page.css";
import Header from "./Header/Header.jsx";
import WeatherData from "./WeatherData/WeatherData.jsx";
import WeatherImg from "./WeatherImg/WeatherImg.jsx";
import WeeklyWeather from "./WeeklyWeather/WeeklyWeather.jsx";
import { useState, FormEvent } from "react";

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

  const getData = async (event) => {
    event.preventDefault();
    const responseOne = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=08fbc45906472df0481f5f947284ab12`
    );
    const dataOne = await responseOne.json();
    console.log(dataOne);
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
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=08fbc45906472df0481f5f947284ab12`
    );
    const dataTwo = await responseTwo.json();
    console.log(dataTwo);
    // Extract daily weather data
    setWeeklyData(dataTwo);
  };

  const backgroundImage = {
    backgroundImage: `url(/cloudy2.jpeg)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw",
  };

  return (
    <main className="content">
      <Header
        cityName={cityName}
        setInputValue={setInputValue}
        getData={getData}
      />
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
    </main>
  );
}
