import React from "react";

import "./index.css";

const ErrorPage = ({ message }) => {
  return (
    <div className="error-page w-full h-screen flex center">
      <b className="error-message">Error: </b>
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorPage;
