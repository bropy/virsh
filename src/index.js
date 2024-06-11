import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // If you have this file
import App from './App';
import reportWebVitals from './reportWebVitals';  // If you have this file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();