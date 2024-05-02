import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { store } from './store.jsx';
import { Provider } from 'react-redux'
import AppRouter from './AppRouter.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <AppRouter />
    </Provider>
  </React.StrictMode>,
)
