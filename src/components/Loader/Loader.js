import React from "react";

import "./index.css";

const Loader = ({ top, right = 0 }) => {
  const loaderStyle = { top, right };
  return (
    <div className="loader absolute" style={loaderStyle}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loader;
