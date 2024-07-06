import React from 'react';
import './WeatherData.css';


const WeatherData = ({ cloud, humidity, windspeed, timestamp }) => {
    
    const date = timestamp ? new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'}) : '';
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div>
            <div className = "clouddiv">
                {cloud ? capitalizeFirstLetter(cloud) : ''}
            </div>
            <div className = "Datediv">{date ? `${date}` : ''}</div>
            <div className = "twodivs">
               <div className="windspeed-div">
                {windspeed ? (
                        <div >
                            Windspeed<br/>
                        <b>{windspeed} m/s</b>
                        </div>
                    ) : ''}
              </div>
              <div className="humidity-div">
                {humidity ? (
                        <div>
                            Humidity<br/><b>{humidity} % </b>
                        </div>
                    ) : ''}
              </div>
            </div>
            <hr />
         </div>

       
    );
};

export default WeatherData;

/*<p>
            {cityName ? `Cityname: ${cityName}` : ''}
            {cloud ? `Cloud: ${cloud}` : ''}
            {humidity ? `Humidity: ${humidity}` : ''}
            {windspeed ? `Windspeed: ${windspeed}` : ''}
            {countryName ? `Country: ${countryName}` : ''}  
            {date ? `date: ${date}` : ''}  
 </p>
 */