import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client'

import './App.css';
import CustomerDashboard from './Pages/CustomerDashboard';
import OwnerDashboard from './Pages/OwnerDashboard';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3001`);
    newSocket.on('connection', () => {
      setSocket(newSocket)
    });
    return () => newSocket.close();
  }, [setSocket]);

  return (
    socket ? (
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {
            <CustomerDashboard socket={socket}/> 
          } />
          <Route path = '/admin' element = {
            <OwnerDashboard socket={socket}/>
          } />
        </Routes>
      </BrowserRouter>
    ) : (
      <p>Not Connected - Navigate to the api folder and run <code>npm run dev</code></p>
    )
  );
}

export default App;
