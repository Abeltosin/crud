import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import AddUsers from './AddUsers.jsx';
import EditUsers from './EditUsers.jsx';

const AppRouter = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/addusers' element={<AddUsers />} />       
            <Route path='/editUser/:id' element={<EditUsers />} />        
            </Routes>
    </Router>
  )
}

export default AppRouter
