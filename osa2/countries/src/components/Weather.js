import React from 'react'

const Weather = ({ weather }) => {
  if (weather) {
    console.log(weather)
    return (
      <div>
        <h3>Weather in {weather.name}</h3>
        <p>{weather.main.temp}C, {weather.weather[0].main}</p>
      </div>
    )
  }
  else {
    return (
      <div></div>
    )
  }
}

export default Weather