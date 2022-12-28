import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ReserveContextProvider } from './context/ReserveContext';
import { SearchContextProvider } from './context/SearchContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <ReserveContextProvider>
          <App />
        </ReserveContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);