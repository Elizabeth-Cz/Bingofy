import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import { AiOutlineMenu } from 'react-icons/ai';
import './Header.css';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [navbarVisible, setNavbarVisible] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  const handleNavLinkClick = () => {
    setNavbarVisible(false);
  };

  return (
    <header className="header">
      <h2 className="logo">Bingofy</h2>
      <button className="hamburger-icon" onClick={toggleNavbar}>
        <AiOutlineMenu />
      </button>
      <ul className={`navbar ${navbarVisible ? 'visible' : ''}`}>
        <li className="navbar-link">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : ' ')}
            onClick={handleNavLinkClick}
          >
            Home
          </NavLink>
        </li>
        <li className="navbar-link">
          <NavLink
            to="/browse"
            className={({ isActive }) => (isActive ? 'active' : ' ')}
            onClick={handleNavLinkClick}
          >
            Browse
          </NavLink>
        </li>
        <li className="navbar-link">
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'active' : ' ')}
            onClick={handleNavLinkClick}
          >
            Contact
          </NavLink>
        </li>
        {user ? (
          <>
            <li className="navbar-link">
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : ' ')}
                to="/myboards"
                onClick={handleNavLinkClick}
              >
                My Boards
              </NavLink>
            </li>
            <li></li>
            <li>
              <h6>Hi, {user.name}</h6>
              <Link className="btn btn-primary" onClick={onLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link
              className="btn btn-primary"
              to="/login"
              onClick={handleNavLinkClick}
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
