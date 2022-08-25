/** @format */

import React, { useState, useRef, useEffect } from "react";
import Card from "../components/card/Card";
import Error from "../components/error/Error";
import LineChart from "../components/lineChart/LineChart";
import Loading from "../components/loading/Loading";
import Tabs from "../components/tabs/Tabs";

import "./Home.css";

export default function Home() {
  const APIKey = "d888e695283db928ef9b9fd7d40936fc";
  const [days, setdays] = useState([]);
  const [maxTemp, setmaxTemp] = useState([]);
  const [date, setdate] = useState([]);
  const [current, setcurrent] = useState([]);
  const [Daily3hourtemp, setDaily3hour] = useState([]);
  const [hour_3, set_hour_3] = useState([]);
  const [radio, setradio] = useState(true);
  const [city, setcity] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [done, setdone] = useState(false);
  const inputRef = useRef("");
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handlersubmit(e) {
    inputRef.current.blur();
    setdone(false);
    e.preventDefault();
    setloading(true);
    seterror(false);
    setradio(true);
    // start fetch get lat/lon
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${APIKey}`
    )
      .then((response) => {
        if (!response.status === 200) {
          seterror(true);
          setloading(false);
          return;
        }
        return response.json();
      })
      .then((d) => {
        if (!d[0]) {
          setloading(false);
          seterror(true);
          return;
        }
        const Latitude = d[0].lat;
        const Longitude = d[0].lon;
        // start fetch daily temp 3hours
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${Latitude}&lon=${Longitude}&appid=${APIKey}&cnt=${8}`
        )
          .then((re) => {
            return re.json();
          })
          .then((dd) => {
            if (!dd.cod === 200) {
              setloading(false);
              seterror(true);
            }

            let ar = [];
            let ar1 = [];
            for (let y = 0; y < 7; y++) {
              ar[y] = Math.round(dd.list[y].main.temp - 273.15);
              var h = formatDate_24_12(dd.list[y].dt_txt).split(" ")[1];
              var AMpm = formatDate_24_12(dd.list[y].dt_txt).split(" ")[2];
              ar1[y] = h + " " + AMpm;
            }

            setDaily3hour(ar);
            set_hour_3(ar1);
          });
        // end fetch daily temp 3hours

        // start fetch weekly
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${Latitude}&lon=${Longitude}&exclude=hourly,minutely&appid=${APIKey}`
        )
          .then((r) => {
            return r.json();
          })
          .then((date) => {
            setcurrent([
              Math.round(date.current.temp - 273.15),
              Math.round(date.current.wind_speed),
              date.current.humidity,
            ]);
            var m = new Date(date.current.dt * 1000).getMinutes();
            m = m < 10 ? "0" + m : m;

            setdate([
              new Date(date.current.dt * 1000).toString().split(" ")[0],
              new Date(date.current.dt * 1000).toString().split(" ")[1],
              new Date(date.current.dt * 1000).toString().split(" ")[2],
              new Date(date.current.dt * 1000)
                .toLocaleTimeString()
                .split(":")[0],
              m,
              new Date(date.current.dt * 1000)
                .toLocaleTimeString()
                .split(" ")[1],
              d[0].name,
              d[0].country,
            ]);
            var arr = [];
            var arr2 = [];
            for (let i = 0; i < 7; i++) {
              let max = Math.round(date.daily[i].temp.max - 273.15);
              let UTCTimeStamp = date.daily[i].dt;
              const milliseconds = UTCTimeStamp * 1000;
              const dateObject = new Date(milliseconds);
              const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
              let day = weekday[dateObject.getDay()];
              arr[i] = day;
              arr2[i] = max;
            }
            setdays(arr);
            setmaxTemp(arr2);
            setloading(false);
            setdone(true);
            seterror(false);
          });
        // end fetch weekly
      });
    // end fetch get lat/lon
  }
  function radiohandler(radio) {
    setradio(radio);
  }
  function errorHandler() {
    seterror(false);
    inputRef.current.focus();
  }
  function formatDate_24_12(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
      h = hh - 12;
      dd = "PM";
    }
    if (h === 0) {
      h = 12;
    }
    m = m < 10 ? "0" + m : m;

    s = s < 10 ? "0" + s : s;

    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);

    var replacement = h;
    replacement += " " + dd;

    return date.replace(pattern, replacement);
  }
  return (
    <div>
      <form className="container wrap" onSubmit={handlersubmit}>
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="City"
            value={city}
            ref={inputRef}
            onChange={(e) => setcity(e.target.value)}
          />
          <button type="submit" className="searchButton">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
      {error && <Error errorHandler={errorHandler} />}
      {loading && <Loading />}
      {done && (
        <div>
          <Card date={date} current={current} />
          <Tabs radiohandler={radiohandler} />
          {radio ? (
            <LineChart
              XDATA={days}
              YDATA={maxTemp}
              border={"#FBE000"}
              background={"#FEF9CC"}
              color={"#67595E"}
            />
          ) : (
            <LineChart
              YDATA={Daily3hourtemp}
              XDATA={hour_3}
              border={"#3E97E7"}
              background={"#a0e7e5"}
              color={"#167D7F"}
            />
          )}
        </div>
      )}
    </div>
  );
}
