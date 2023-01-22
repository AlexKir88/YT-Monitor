import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import observe from './Components/Observer';

const node = document.getElementById('root');
const root = ReactDOM.createRoot(node);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// observe(node);
