import './App.css';
import reportWebVitals from './reportWebVitals';
import initApp from './initApp.js';

const app = async () => {
  await initApp();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};
app();
