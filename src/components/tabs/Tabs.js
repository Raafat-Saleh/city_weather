/** @format */

import React, { useState } from "react";
import "./Tabs.scss";

export default function Tabs({ radiohandler }) {
  const [backgroundcolor, setbackgroundcolor] = useState(true);
  return (
    <div className="contain">
      <div className={`tabs ${backgroundcolor ? "radio_background_2" : ""}`}>
        <input
          type="radio"
          id="radio-1"
          name="tabs"
          onChange={() => {
            setbackgroundcolor(true);
            radiohandler(true);
          }}
        />
        <label className="tab" htmlFor="radio-1">
          Weekly
        </label>
        <input
          type="radio"
          id="radio-2"
          name="tabs"
          onChange={() => {
            setbackgroundcolor(false);
            radiohandler(false);
          }}
        />
        <label className="tab" htmlFor="radio-2">
          Today
        </label>
        <span className="glider"></span>
      </div>
    </div>
  );
}
