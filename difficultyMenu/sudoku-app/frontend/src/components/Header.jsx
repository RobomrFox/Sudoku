import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <h1>Sudoku App</h1>
      </div>
      <nav className="nav-menu">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/play"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Play
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Stats
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
