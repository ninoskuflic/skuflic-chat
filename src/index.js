import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTopcloseOnClickrtl={false}
      pauseOnFocusLossdraggablepauseOnHovertheme='dark'
    />
    <App />
  </React.StrictMode>
);
