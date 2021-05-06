import React, { useState } from "react";

import "./SelectAuthor.css";

const SelectAuthor = (props) => {
  const jupiterHandler = () => {
    props.chatVisibility();
    props.onJupiter();
  };

  const earthHandler = () => {
    props.chatVisibility();
    props.onEarth();
  };

  return (
    <div className="author">
      <div className="author-title">Select Your Author</div>
      {
        <button type="button" onClick={jupiterHandler}>
          Jupiter
        </button>
      }
      {<button onClick={earthHandler}>Earth</button>}
    </div>
  );
};

export default SelectAuthor;
