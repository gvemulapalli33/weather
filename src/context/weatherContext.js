import React, {useState} from "react";
export const weatherContext = React.createContext();
export function WeatherContextProvider(props) {
    const [weatherData, setWeatherData] = useState([]);
    const [isNight, setNight] = useState(true);
    const [isDay, setDay] = useState(false);

    const addWeatherData = (input) => {
        setWeatherData(input);
    }

    const timeOfDay = (isNight, isDay) => {
       setNight(isNight);
       setDay(isDay);   
    }

    return (
        <weatherContext.Provider value={{isNight, isDay, weatherData, addWeatherData, timeOfDay}}>
            {props.children}
        </weatherContext.Provider>
    );
}
