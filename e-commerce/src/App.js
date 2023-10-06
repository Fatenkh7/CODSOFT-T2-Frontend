import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/index';
import About from './pages/About/index';
import Contact from './pages/contact/index';
import Footer from './components/footer/index';
import Home from './pages/home/index';
import SignUp from './pages/signup/index';
import NoPage from './pages/nopage/index';
import SignIN from './pages/signin/index';
import Loading from './components/loading/index';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserToken();
  }, []);

  const checkUserToken = () => {
    setIsLoading(true)
    const userToken = localStorage.getItem('user-auth');
    if (userToken) {
      setIsLoggedIn(true);
      setIsLoading(false)
    } else {
      setIsLoggedIn(false);
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIN />} />
          <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
          <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/" />} />
          <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/" />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
