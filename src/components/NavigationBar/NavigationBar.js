import { NavLink, useLocation } from "react-router-dom";
import * as icons from "C:/Users/Dako/Documents/Springboard/space-travel/src/icons"

import styles from "./NavigationBar.module.css";

function NavigationBar() {
  const location = useLocation();
  return (
    <nav className={styles["navbar"]}>
      <ul className={styles["nav-list"]}>
        <li className={styles["nav-item"]}>
          <NavLink to="/" style={location.pathname === "/" ? { outline: "2px solid white", outlineOffset: "5px" } : {}}>
            <img className={styles["nav-img"]} src={icons.planetEarth}></img>
            <p>Home</p>
          </NavLink>
        </li>
        <li className={styles["nav-item"]}>
          <NavLink to="/spacecrafts" style={location.pathname === "/spacecrafts" ? { outline: "2px solid white", outlineOffset: "5px" } : {}}>
            <img className={styles["nav-img"]} src={icons.rocket}></img>
            <p>Spacecrafts</p>
          </NavLink>
        </li>
        <li className={styles["nav-item"]}>
          <NavLink to="/planets" style={location.pathname === "/planets" ? { outline: "2px solid white", outlineOffset: "5px" } : {}}>
            <img className={styles["nav-img"]} src={icons.planet}></img>
            <p>Planets</p>
          </NavLink>
        </li>
      </ul>
    </nav >
  );
}

export default NavigationBar;
