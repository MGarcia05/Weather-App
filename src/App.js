import React, { useState } from 'react';
const api = {
  key: "///", //removed; please use API key from Open Weather if you wish! 
  base: "https://api.openweathermap.org/data/2.5/"
}

/* This project was heavily inspired by Tyler Potts and his YouTube video, 
 "Build a Weather App in React JS | React JS beginner Tutorial". 
  As of 3/24/2022, the video can be found here: https://www.youtube.com/watch?v=GuA0_Z1llYU*/


function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}: ${month} ${date}, ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") 
    ? (
      (weather.weather[0].main === "Clouds") ? 'app clouds' : 
      (weather.weather[0].main === "Clear") ? 'app clear' : 
      (weather.weather[0].main === "Thunderstorm") ? 'app thunder' :
      (weather.weather[0].main === "Snow") ? 'app snow' :
      (weather.weather[0].main === "Mist") ? 'app mist' :
      (weather.weather[0].main === "Rain" || "Drizzle") ? 'app rain' : 'app')
    : 'app'}> 

      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°F
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ("") }
      </main>
    </div>
  );
}

export default App;


