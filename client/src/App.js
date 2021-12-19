import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client'

import './App.css';
import Dashboard from './Pages/Dashboard';

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
      <div>
        <h1>Look Inna Book</h1>
        <BrowserRouter>
        <Routes>
          <Route path = '/' element = {
            <Dashboard socket={socket}/> 
          } />
        </Routes>
      </BrowserRouter>
      </div>
    ) : (
      <p>Not Connected - Navigate to the api folder and run <code>npm run dev</code></p>
    )
  );
}

export default App;
