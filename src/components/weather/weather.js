import React, {useContext, useEffect, useState} from "react";
import {weatherContext} from "../../context/weatherContext";
import useFetch from "../../hooks/useFetch";
import './weather.css';
import {formatTemperature, formatTime, imageMapping} from "../../util/helper";
const url = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=e4a0f96c5a39c793a70c096770c0051e`;

function Weather() {
    const {addWeatherData, timeOfDay} = useContext(weatherContext);
    const localData = JSON.parse(localStorage.getItem("weather"));
    const [isDay, setDay] = useState('');
    const [isNight, setNight] = useState('');
    const [weatherInfo, setWeatherInfo] = useState({});
    const [loading, error, data] = useFetch(url);
    let description, currentTime, name, currentTemp, currentCondition, minTemp, maxTemp, sunrise, sunset;

    if (Object.keys(localData).length > 0) {
       ({ dt: currentTime, main: {temp : currentTemp, feels_like: currentCondition, temp_min: minTemp, temp_max: maxTemp}, name, sys: {sunrise, sunset}, weather: [{description}]} = localData);
    }

    const mist = ["mist", "Smoke", "Haze", "sand", "fog", "dust", "ash", "squalls", "tornado"];

    const getIcon = (description) => {
        if (description.includes("thunderstorm")) {
            return imageMapping['thunderStormIcon'];
        } else if (description.includes("rain") || description.includes('drizzle')) {
           return imageMapping['rainIcon'];
       } else if (description.includes('snow') || description.includes('sleet')) {
           return imageMapping['snowIcon'];
       } else if (mist.includes(description)) {
           return imageMapping['fogIcon'];
       } else if (description.includes('cloud')) {
            return imageMapping['cloudIcon'];
       } else {
           return imageMapping['sunIcon'];
       }
    };

    useEffect (() => {
        if (Object.keys(data).length > 0) {
           addWeatherData(data);
           ({ dt: currentTime, main: {temp : currentTemp, feels_like: currentCondition, temp_min: minTemp, temp_max: maxTemp}, name, sys: {sunrise, sunset}, weather: [{description}]} = data);
           setWeatherInfo({
            currentTemp,
            currentCondition,
            minTemp,
            maxTemp,
            name,
            sunrise,
            sunset, 
            description
           });

           const sunriseTime = formatTime(new Date(sunrise * 1000));
           const timing = formatTime(new Date(currentTime * 1000));
           const [time, meredian] = timing.split(' ');
           if (meredian === 'AM' && +time < +sunriseTime.split(' ')[0]) {
               setNight(true);
           } else {
               setDay(true);
           }
           timeOfDay(isNight, isDay);
        }
    }, [data]);

    const nightColors = {
        border: `1px solid var(--night-text-color)`,
        boxShadow: `1px 2px 10px var(--night-box-shadow)`
    }

    const nightTextColor = {
        color: `var(--night-text-color)`
    }

    const dayTextColor = {
        color: `var(--day-text-color)`,
    }

    const dayBorderColor = {
        border: `3px solid var(--day-text-color)`
    }

    const nightBorderColor = {
        border: `3px solid var(--night-text-color)`
    }


    const dayColors = {
        border: `1px solid var(--day-text-color)`,
        boxShadow: `1px 2px 10px var(--day-box-shadow-color)`
    }

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error. Try again Later</p>}
            {data && 
            <article className="weatherInfo" style={isNight ? nightColors : dayColors}>
                <h1 className="cityName" style={isNight ? nightTextColor : dayTextColor}>{name}</h1>
                <img className="forecast" src={getIcon(description)} alt="weather condition"></img>
                <h2 className="overview" style={isNight ? nightTextColor : dayTextColor}>{description}</h2>
                <section className="dayInfo">
                <div className="dayTiming" style={isNight ? nightBorderColor : dayBorderColor}>
                <p className="subText" style={isNight ? nightTextColor : dayTextColor}>
                 <span className="time">
                 <span><img className="sunrise" src={imageMapping['sunIcon']} alt="sunrise"/></span>
                 {formatTime(new Date(sunrise * 1000))}
                 </span>
                 <span className="title">sunrise</span>  
                </p>
                <p className="subText" style={isNight ? nightTextColor : dayTextColor}>
                <span className="time">
                <span>
                <img className="sunset" src={imageMapping['sunsetIcon']} alt="sunset"/></span>
                {formatTime(new Date(sunset))}
                </span>
                <span className="title">sunset</span>  
                </p>
                </div>
                <div className="dayTiming" style={isNight ? nightBorderColor : dayBorderColor}>
                    <p className="subText" style={isNight ? nightTextColor : dayTextColor}>
                    <span className="time">
                    <span>
                    <img className="temperature" src={imageMapping['temperatureIcon']} alt="temperature"/></span>
                    {formatTemperature(minTemp)}
                    </span>
                    <span className="title">min temp</span>  
                    </p>
                    <p className="subText" style={isNight ? nightTextColor : dayTextColor}> 
                    <span className="time">
                    <span><img className="temperature" src={imageMapping['temperatureIcon']} alt="temperature"/></span>
                    {formatTemperature(maxTemp)}
                    </span>
                    <span className="title">max temp</span> 
                   
                    </p>
                </div>
                </section>
            </article>
            }

        </>

    );
}

export default Weather;
