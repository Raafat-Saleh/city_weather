/** @format */

import React from "react";
import "./Error.scss";
export default function Error({ errorHandler }) {
  return (
    <div className="parent">
      <div id="container_error">
        <div id="error-box">
          <div className="dot" onClick={() => errorHandler()}></div>
          <div className="face2">
            <div className="eye"></div>
            <div className="eye right"></div>
            <div className="mouth sad"></div>
          </div>
          <div className="shadow move"></div>
          <div className="message">
            <h1 className="alert">
              There seems to have been an error, please re-enter a city
            </h1>
          </div>
          <button className="button-box" onClick={() => errorHandler()}>
            try again
          </button>
        </div>
      </div>
    </div>
  );
}
