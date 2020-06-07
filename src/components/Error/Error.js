import React from "react";

import refresh from "../../svgs/refresh.svg";
import "./index.css";

const Error = ({ error, handler }) => {
  return (
    <div
      className="error flex center absolute cursor-pointer"
      onClick={handler}
    >
      <p className="error-text">{error}</p>
      <img src={refresh} className="error-svg" alt="refresh" />
    </div>
  );
};

export default Error;
