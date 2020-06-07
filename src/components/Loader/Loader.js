import React from "react";

import "./index.css";

const Loader = () => {
  return (
    <div className="loader absolute">
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Loader;
