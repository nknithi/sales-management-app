// Import statements
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Addsales from './Addsales';
import Topsales from './Topsales';
import Login from './Login';
import Register from './Register';
import Totalrevenue from './Totalrevenue';


function App() {

  // State to track user's login status based on presence of token in localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Function to handle login action, setting isLoggedIn to true
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout action, removing token from localStorage and setting isLoggedIn to false
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="app-bg">

      {/* React Router setup */}
      <Router>

        {/* Navbar component with props isLoggedIn and handleLogout */}
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

        {/* Routes setup */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/addsales" /> : <Login handleLogin={handleLogin} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          {isLoggedIn && (
            <>
              <Route path="/addsales" element={<Addsales />} />
              <Route path="/topsales" element={<Topsales />} />
              <Route path="/totalrevenue" element={<Totalrevenue />} />
            </>
          )}
          {/* Redirect to login if not authenticated */}
          {!isLoggedIn && <Route path="*" element={<Navigate to="/login" replace />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
