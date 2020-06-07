import React from "react";

import AutoComplete from "../AutoComplete";

import "./index.css";

const Header = () => {
  return (
    <div className="header w-full flex center sticky">
      <div className="header-container w-full flex item-center">
        <a href="/" className="header-logo">
          MNGR
        </a>
        <AutoComplete />
      </div>
    </div>
  );
};

export default Header;
