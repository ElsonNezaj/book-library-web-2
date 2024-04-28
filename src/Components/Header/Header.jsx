import React from "react";
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.scss";

const Header = ({ style, caller }) => {
  return (
    <header className={`header ${style}`}>
      <Navbar caller={caller} style={style} />
    </header>
  );
};

export default Header;
