import './WeeklyWeather.css';
import { useState, useEffect } from "react";

export default function WeeklyWeather({ weeklyData }) {

  const [weatherInfo, setWeatherInfo] = useState([]);

  useEffect(() => {

    if (weeklyData && weeklyData.list && Array.isArray(weeklyData.list)) {
      const newWeatherInfo = [];

      // Helper function to get the day name from timestamp
      const getDayName = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
      };

      let previousDayName = null;

      // Iterate through the weather data
      for (let i = 0; i < weeklyData.list.length; i++) {
        const dayData = weeklyData.list[i];
        const dayName = getDayName(dayData.dt);
         if(i === 0){
           previousDayName = dayName;
         }
        // Check if dayName has changed since the last iteration
        if (dayName !== previousDayName) {
          let dayImage = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;
          newWeatherInfo.push({
            dayName: dayName,
            temperature: `${dayData.main.temp}°C`,
            weatherDescription: dayData.weather[0].description,
            weatherImage : dayImage 
          });
          previousDayName = dayName; // Update previousDayName
        }
      }
      setWeatherInfo(newWeatherInfo);
    } else {
      console.error('Weekly data is undefined or list is not an array.');
    }
  }, [weeklyData]);

  return (
    <div className="weeklyWeather">
      {weatherInfo.map((info, index) => (
        <div key={index} className="dayWeather">
          <div><b>{info.dayName}</b></div><br /><br />
          <div style={{ color: '#CD3700' }}><b>{info.temperature}</b></div>
          <img src={info.weatherImage} alt={info.weatherDescription} />
        </div>
      ))}
    </div>
  );
}
