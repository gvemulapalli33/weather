import './App.css';
import React, {useContext} from "react";
import Weather from "./components/weather/weather";
import {weatherContext} from "./context/weatherContext";

function App() {
  const {isNight} = useContext(weatherContext);

  console.log(isNight);

  const nightColor = {
    backgroundColor: `--night-background-color`
  }

  const dayColor = {
    backgroundColor: `--day-background-color`
  }

  return (
    <div className="container" style={isNight ? nightColor : dayColor}>
      <Weather />
    </div>
  );
}

export default App;
