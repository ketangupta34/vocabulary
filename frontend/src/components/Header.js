import React from "react";
import "../stylesheets/Header.css";

import SearchIcon from "@material-ui/icons/Search";

function Header({ setSearchTerm }) {
  return (
    <div className="header">
      <h1 className="logoName">Vocabulary</h1>
      <div className="searchWord">
        <input
          className="searchInput"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon className="searchButton" />
      </div>
    </div>
  );
}

export default Header;
