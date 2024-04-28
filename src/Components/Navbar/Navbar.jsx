import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import logoImg from "../../Images/logo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useAuth } from '../../AuthContext'; // Adjust the path as necessary

const Navbar = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { currentUser, logout } = useAuth(); // Destructure currentUser and logout from useAuth
  const navigate = useNavigate();

  // Close the navbar menu when a link is clicked
  const closeMenu = () => {
    setToggleMenu(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  useEffect(() => {
    const closeMenuOnResize = () => {
      // Close the menu when the window is resized (for responsive behavior)
      if (window.innerWidth >= 992) {
        setToggleMenu(false);
      }
    };

    window.addEventListener('resize', closeMenuOnResize);

    return () => {
      window.removeEventListener('resize', closeMenuOnResize);
    };
  }, []);

  return (
    <nav className='navbar' id="navbar">
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler flex flex-sb'>
          <Link to="/" className='navbar-brand flex' onClick={closeMenu}>
            <img src={props.style === 'v2' ? logoImg : logoImg} alt="site logo" className="logo-small" />
          </Link>
          <button type="button" className='navbar-toggler-btn' onClick={() => setToggleMenu(!toggleMenu)}>
            <HiOutlineMenuAlt3 size={35} style={{
              color: `${toggleMenu ? "#fff" : "inherit"}`
            }} />
          </button>
        </div>

        <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
          <ul className="navbar-nav">
            <li className='nav-item'>
              <NavLink to="/" className='nav-link text-uppercase fs-22 fw-6 ls-1' onClick={closeMenu}>Home</NavLink>
            </li>
            {/* Conditionally render Favorites link if user is logged in */}
            {currentUser && (
              <li className='nav-item'>
                <NavLink to="/favorites" className='nav-link text-uppercase fs-22 fw-6 ls-1' onClick={closeMenu}>Favorites</NavLink>
              </li>
            )}
            {/* Conditionally render Login or Logout link */}
            {currentUser ? (
              <li className='nav-item' onClick={handleLogout}>
                <span className='nav-link text-uppercase fs-22 fw-6 ls-1' style={{cursor: 'pointer'}} onClick={closeMenu}>Logout</span>
              </li>
            ) : (
              <li className='nav-item'>
                <NavLink to="/login" className='nav-link text-uppercase fs-22 fw-6 ls-1' onClick={closeMenu}>Log In</NavLink>
              </li>
            )}
            <li className='nav-item'>
              <NavLink to="/about" className='nav-link text-uppercase fs-22 fw-6 ls-1' onClick={closeMenu}>About</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
