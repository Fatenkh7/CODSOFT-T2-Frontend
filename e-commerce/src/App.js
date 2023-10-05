import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/index';
import About from './pages/About/index';
import Contact from './pages/contact/index';
import Footer from './components/footer/index';
import SignIN from './pages/signin/index';
import Home from './pages/Home/index';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to set login status (replace this with your actual logic)
  const handleLogin = () => {
    // Set login status to true (successful login)
    setIsLoggedIn(true);
  };

  useEffect(() => {
    // Check if the user is already logged in (e.g., by checking for a token in localStorage)
    const userToken = localStorage.getItem('user-auth');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Header>
                <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
                <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/login" />} />
              </Header>
            }
          />
          <Route path="/login" element={<SignIN onLogin={handleLogin} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
