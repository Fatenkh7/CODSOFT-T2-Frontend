import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Header from "./components/header/index";
import About from "./pages/About/index";
import Contact from "./pages/contact/index";
import Footer from "./components/footer/index";
import Home from "./pages/home/index";
import SignUp from "./pages/signup/index";
import NoPage from "./pages/nopage/index";
import SignIN from "./pages/signin/index";
import Loading from "./components/loading/index";
import { RequireAuth } from "react-auth-kit";
import AuthProvider from "react-auth-kit/AuthProvider";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   checkUserToken();
  // }, []);

  // const checkUserToken = () => {
  //   const userToken = localStorage.getItem('user-auth');
  //   if (userToken) {
  //     setIsLoggedIn(true);
  //   }
  //   setIsLoading(false);
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider authType={'cookie'}
          authName={'_auth'}
          cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === "https:"}>
          <Routes>
            <Route path="/login" element={<SignIN />} />
            <Route
              path="/"
              element={
                <RequireAuth loginPath="/login">
                  <>
                    <Outlet />
                  </>
                </RequireAuth>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
