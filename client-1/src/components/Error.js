import React from "react";
import image from "../images/Memoria-Game.JPG";

const Error = () => {
  return (
    <div className="handleError">
      <h1>Oops...Someting went wrong!</h1>
      <h2>We are working on it</h2>
      <h4>While you wait...</h4>
      <h5>Check out my Memory Game!</h5>
      <a href="https://jenniecbm.github.io/Memory-emoji/" target="_blank">
        <img src={image}></img>
      </a>
    </div>
  );
};
export default Error;
