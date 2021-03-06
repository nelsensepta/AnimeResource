import { NavLink } from "react-router-dom";
import {
  IoGrid,
  IoTrendingUp,
  IoHeart,
  IoMusicalNotesSharp,
} from "react-icons/io5";
import { FaQuoteRight } from "react-icons/fa";
// styles
import styles from "./BottomBar.module.css";

const BottomBar = () => {
  const activeStyle = {
    color: "rgb(54, 34, 100)",
  };

  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <IoGrid className={styles.icon} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/songs"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <IoMusicalNotesSharp className={styles.icon} />
            <span>Songs</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/quotes"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <FaQuoteRight className={styles.icon} />
            <span>Quotes</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favorites"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <IoHeart className={styles.icon} />
            <span>Favorites</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default BottomBar;
