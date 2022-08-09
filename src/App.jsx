import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import axios from "axios";

function App() {
  const apiKey = "a2a2f7dbb442decea9fd6b671b27b2b3";
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div
      className={
        typeof data.main != "undefined"
          ? data.main.temp > 90
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <div className=" bg-neutral-900/70 text-neutral-100 font-sans text-xl min-h-screen min-w-screen flex flex-col justify-between">
        <div className="search text-center p-4 ">
          <input
            className="py-3 px-6 border border-gray-200 rounded-full bg-gray-50/30
        placeholder:text-neutral-50"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Search Location"
            type="text"
          />
          {/* <button className="cursor-pointer z-10 text-xl" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button> */}
        </div>
        {data.name != undefined && (
          <>
            <div className=" mx-4 pt-[11rem] relative bottom-44 md:pt-16 mt-10">
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? (
                  <h1 className="font-bold text-7xl py-4">
                    {data.main.temp}°F
                  </h1>
                ) : null}
                {data.weather ? (
                  <p className="absolute left-[90%] rotate-[270deg] font-medium md:left-[95%] md:font-semibold">
                    {data.weather[0].main}
                  </p>
                ) : null}
                <p className="date">{dateBuilder(new Date())}</p>
              </div>
            </div>
            <div className="bottom bg-neutral-50/30 flex flex-col items-center text-center px-1 py-1 my-11 mx-11 rounded-xl  border-2 shadow-2xl border-neutral-100/25 md:flex-row md:justify-evenly">
              <div className="feels p-4">
                {data.main ? (
                  <p className="mb-2 font-bold">{data.main.feels_like}°F</p>
                ) : null}
                <p className="font-medium">Feels Like</p>
              </div>
              <div className="humidity p-4">
                {data.main ? (
                  <p className="mb-2 font-bold">{data.main.humidity}%</p>
                ) : null}
                <p className="font-medium">Humidity</p>
              </div>
              <div className="wind p-4">
                {data.wind ? (
                  <p className="mb-2 font-bold">{data.wind.speed}MPH</p>
                ) : null}
                <p className="font-medium">Winds</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
