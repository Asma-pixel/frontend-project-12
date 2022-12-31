import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { io } from 'socket.io-client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap/dist/react-bootstrap';
import './App.css';
import initApp from './initApp.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const socket = io();
const app = initApp(socket);
root.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
