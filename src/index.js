import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactGA from 'react-ga'; // for google analytics

// for google analytics
ReactGA.initialize('YOUR_TRACKING_ID');
ReactGA.pageview(window.location.pathname + window.location.search);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

