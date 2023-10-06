import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/index';
import About from './pages/About/index';
import Contact from './pages/contact/index';
import Footer from './components/footer/index';
import SignIN from './pages/signin/index';
import Home from './pages/home/index';
import SignUp from './pages/signup/index'; // Import the SignUp component
import NoPage from './pages/nopage/index';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-auth');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIN />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
