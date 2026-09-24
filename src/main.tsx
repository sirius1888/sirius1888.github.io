import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/montserrat';
import '@fontsource-variable/inter';
import './styles.css';
import './redesign.css';
import App from './App';

const root = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
