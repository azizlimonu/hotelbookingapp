import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user !== "") {
    navigate('/');
  }

  const handleInputChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post(
        `/auth/login`, credentials
      );
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
      navigate('/');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <form className="lContainer" onSubmit={handleLogin}>
        <div className='lContainerHeader'>
          Sign in or create an account
        </div>
        <p className='lParagph'>Email</p>
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleInputChange}
          className="lInput"
        />
        <p className='lParagph'>Passowrd</p>
        <input
          type="password"
          placeholder="password"
          id="password"
          autoComplete='on'
          onChange={handleInputChange}
          className="lInput"
        />
        <button disabled={loading} type='submit' className="lButton">
          Login
        </button>
        <span className='signupBtn' onClick={() => navigate('/register')}>
          Dont have an account? Register Here
        </span>
        {error && <span>{error.message}</span>}
      </form>
    </div>
  )
}

export default Login