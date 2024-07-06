import React from 'react';
import './WeatherImg.css';
import { getName } from 'country-list';

const WeatherImg = ({ image, temp, placename, country}) => {
    let countryName = country ? getName(country) : '';
    if(countryName == "United Kingdom of Great Britain and Northern Ireland"){
        countryName = "United Kingdom";
    }
    if (image === 'false') {
        return '';
    } else {
        const roundedTemp = temp ? Math.round(temp) : null;
        return (
            <>
                <div className = "Placediv">
                    {placename ? ` ${placename}` : ''},
                    {countryName ? `${countryName}` : ''}  
                </div>
                <div className="divImgTemp">
                    <img src={image} alt="Weather Image" />
                    <span>{roundedTemp !== null ? `${roundedTemp}°C` : ''}</span>
                </div>
            </>
        );
    }
};

export default WeatherImg;
