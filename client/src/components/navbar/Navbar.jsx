import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

const Navbar = ({ type }) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='navLogo'>
            Booking Clone
          </span>
        </Link>
        {user ? (
          <div className='navItems'>
            <button
              className='navInfo-btn'
              onClick={() => navigate('/reservations')}
            >
              List your reservations
            </button>
            {user.username}
            <button
              className='navItems-btn'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='navItems'>
            {type !== 'login' && type !== 'register' && (
              <>
                <button
                  className='navItems-btn'
                  onClick={()=>navigate('/register')}
                >
                  Register
                </button>
                <button
                  className='navItems-btn'
                  onClick={()=>navigate('/login')}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;