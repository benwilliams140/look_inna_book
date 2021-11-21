import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import CustomerDashboard from './Pages/CustomerDashboard';
import OwnerDashboard from './Pages/OwnerDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/login' element = { 
          <Login/>
        } />
        <Route path = '/register' element = {
          <Register/>
        } />
        <Route path = '/' element = {
          <CustomerDashboard/> 
        } />
        <Route path = '/admin' element = {
          <OwnerDashboard/>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
