import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { setAccessToken } from './services/api';
import { getUser } from './store/actions';
import decode from "jwt-decode";
import { SET_CURRENT_USER } from './store/type';

const root = ReactDOM.createRoot(document.getElementById('root'));
const token = localStorage.getItem("jwtToken");
if (token) {
  setAccessToken(token);
  store.dispatch(getUser());
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decode(token),
  });
}
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
