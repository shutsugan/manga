import React from "react";

import "./index.css";

const ShimmerLoader = ({ width, height, mt, mb, mr, ml }) => {
  const shimmerStyle = {
    width,
    height,
    marginTop: mt,
    marginBottom: mb,
    marginRight: mr,
    marginLeft: ml,
    borderRadius: "0.15rem",
  };

  return (
    <div className="shimmer-loading shimmer margin-none" style={shimmerStyle} />
  );
};

export default ShimmerLoader;
