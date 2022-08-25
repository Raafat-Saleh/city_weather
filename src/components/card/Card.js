/** @format */

import React from "react";
import "./Card.css";

export default function Card({ date, current }) {
  return (
    <div className="weather-card">
      <h5 className="city">
        {date[6]} <span className="symbol">||</span> {date[7]}
      </h5>
      <h5 className="day">
        {date[0]} {date[2]} {date[1]}&nbsp;
        <span className="symbol">||</span>&nbsp;{date[3]}:{date[4]} {date[5]}
      </h5>
      <h4 className="degree e">
        {current[0]} <span className="">°</span>C
      </h4>
      <h4 className="weather_name">
        wind:<span className="degree">&nbsp;{current[1]} KMPH</span>
      </h4>
      <h4 className="weather_humidity">
        Humidity:<span className="degree"> {current[2]}%</span>
      </h4>
    </div>
  );
}
