import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <header className="header">
      <h2 className="logo">Bingofy</h2>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : ' ')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/browse"
            className={({ isActive }) => (isActive ? 'active' : ' ')}
          >
            Browse
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'active' : ' ')}
          >
            Contact
          </NavLink>
        </li>
        {!user ? (
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : ' ')}
              to="/login"
            >
              Login
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : ' ')}
                to="/myboards"
              >
                My Boards
              </NavLink>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;

{
  /* <ul>
<li>
  <Link to="/">My Boards</Link>
</li>
<li>
  <Link to="/create">Create new board</Link>
</li>
 <li>
  <Link to="/play">Play</Link>
</li> 
</ul>
<ul>
{user ? (
  <>
     <li>
      <Link to="/myaccount">My account</Link>
    </li> 
    <li>
      <button className="btn" onClick={onLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </li>
  </>
) : (
  <>
    <li>
      <Link to="/login">
        <FaSignInAlt />
        Login
      </Link>
    </li>
    <li>
      <Link to="/register">
        <FaUser />
        Register
      </Link>
    </li>
  </>
)}
</ul> */
}
