import { NavLink } from "react-router-dom";
import { FaGg } from "react-icons/fa";
// import Logo from "";
// styles
import styles from "./Header.module.css";

const Header = () => {
  const activeStyle = {
    color: "#fff",
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <NavLink to="/">
          <FaGg className={styles.logo} />
          {/* <img src="/chibi-mikasa.jpg" alt="mikasa" className={styles.logo} /> */}
        </NavLink>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="songs"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Songs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="favorites"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink
                to="quotes"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Quotes
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
