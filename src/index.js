import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { Warning } from './Components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTopcloseOnClickrtl={false}
      pauseOnFocusLossdraggablepauseOnHovertheme='dark'
    />
    <Warning />
    <App />
  </>
);
