import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

const Navbar = ({ type }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        {user ? (
          <p> {user.username}</p>
        ) : type !== 'form' && (
          <div className="navItems">
            <button className="navButton" onClick={() => navigate('/register')}>Register</button>
            <button className="navButton" onClick={() => navigate('/login')}>Login</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;