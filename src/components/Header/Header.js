import { NavLink, Link } from "react-router-dom";

import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header-logo">
        </Link>

        <nav className="header__navigation">
          <ul className="header__menu">
            <li className="header__nav">
              <NavLink
                to="/godowns"
                className={({ isActive }) =>
                  isActive
                    ? "header__nav-link header__nav-link--active"
                    : "header__nav-link"
                }
              >
                Godowns
              </NavLink>
            </li>
            <li className="header__nav">
              <NavLink
                to="/inventory"
                className={({ isActive }) =>
                  isActive
                    ? "header__nav-link header__nav-link--active"
                    : "header__nav-link"
                }
              >
                Inventory
              </NavLink>
            </li>
            <li className="header__nav">
              <NavLink
                to="/inwards"
                className={({ isActive }) =>
                  isActive
                    ? "header__nav-link header__nav-link--active"
                    : "header__nav-link"
                }
              >
                Inwards
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
