import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(1);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
    country: '',
    city: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        `/auth/register`, credentials
      );
      navigate('/login');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="register">
        {step === 1 && (
          <div className="rContainer">
            <div className="rHeader">
              Create an Account
            </div>
            <p className='pInput'>Email</p>
            <input
              type='email'
              placeholder='Email'
              value={credentials.email}
              id="email"
              onChange={handleInputChange}
              className='rInput'
            />
            <p className='pInput'>Password</p>
            <input
              type='password'
              placeholder='password'
              value={credentials.password}
              id="password"
              onChange={handleInputChange}
              className='rInput'
            />
            <button
              onClick={() => setStep(2)}
              className='rNext-btn'
              disabled={credentials.email === "" || credentials.password === ""}
            >
              Next
            </button>
            <span
              className='login-btn'
              onClick={() => navigate('/login')}
            >
              Have an account? Sign in here
            </span>
          </div>
        )}
        {step === 2 && (
          <div className="rContainer">
            <div className="rHeader">
              Your Basic Information
            </div>
            <p className='pInput'>Username</p>
            <input
              type='text'
              placeholder='username **'
              value={credentials.username}
              id="username"
              onChange={handleInputChange}
              className='rInput'
            />
            <p className='pInput'>Country</p>
            <input
              type='text'
              placeholder='country *'
              value={credentials.country}
              id="country"
              onChange={handleInputChange}
              className='rInput'
            />
            <p className='pInput'>City</p>
            <input
              type='text'
              placeholder='city'
              value={credentials.city}
              id="city"
              onChange={handleInputChange}
              className='rInput'
            />
            <p className='pInput'>PhoneNumber</p>
            <input
              type='number'
              placeholder='phone'
              value={credentials.phone}
              id="phone"
              onChange={handleInputChange}
              className='rInput'
            />
            <button
              onClick={() => setStep(1)}
              className='rPreviousbtn'
            >
              Previouse
            </button>
            <button
              className='register-btn'
              onClick={handleRegister}
              disabled={
                isLoading ||
                !credentials.username ||
                !credentials.password ||
                !credentials.email ||
                !credentials.country ||
                !credentials.city ||
                !credentials.phone
              }
            >
              Register
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default Register