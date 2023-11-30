import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './pages/Login';
import Home from './pages/Home';
import Token from './pages/Token';
import Profile from './pages/Profile';

import { storeToken, getToken, removeToken } from './utils/auth';

enum Page { Home, Token, Profile, Login }
function App() {
  
  const [loginToken, setLoginToken] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const handleLoginSuccess = () => {
    const token = getToken();
    // Update the login state
    setLoginToken(token);
    // Set the default page to Home after login
    setCurrentPage(Page.Home);

    if (token) {
      storeToken(token);
    }

  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setLoginToken(token);
    } 
    else {
      setCurrentPage(Page.Login);
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home />;
      case Page.Token:
        return <Token />;
      case Page.Profile:
        return <Profile />;
      case Page.Login:
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }
  };

  const handleSignOut = () => {
    removeToken();
    setLoginToken(null);
    setCurrentPage(Page.Login); // Redirect to login page after sign out
  };

  return (
  <div className="App">
    {loginToken ? (
      <div className="container p-4 border">
        <div className="nav nav-pills nav-fill gap-1 p-2 small bg-primary rounded-5 shadow-lg" id="customNav" style={{ color: 'var(--bs-white)', backgroundColor: 'var(--bs-primary)', background: 'var(--bs-white)' }} role="tablist">
          
          <div className={`nav-item ${currentPage === Page.Home ? 'active bg-white rounded-5' : ''}`} role="presentation">
            <button className={`nav-link rounded-5 ${currentPage === Page.Home ? 'text-Black' : 'text-white'}`} onClick={() => setCurrentPage(Page.Home)}>Home</button> {/* aria-selected={currentPage === Page.Home} */}
          </div>

          <div className={`nav-item ${currentPage === Page.Profile ? 'active bg-white rounded-5' : ''}`} role="presentation">
            <button className={`nav-link rounded-5 ${currentPage === Page.Profile ? 'text-Black' : 'text-white'}`} onClick={() => setCurrentPage(Page.Profile)}>Profile</button> {/* aria-selected={currentPage === Page.Token}*/}
          </div>

          <div className={`nav-item ${currentPage === Page.Token ? 'active bg-white rounded-5' : ''}`} role="presentation">
            <button className={`nav-link rounded-5 ${currentPage === Page.Token ? 'text-Black' : 'text-white'}`} onClick={() => setCurrentPage(Page.Token)}>Contact</button> {/* aria-selected={currentPage === Page.About}*/}
          </div>

          <div className={`nav-item ${currentPage === Page.Profile && Page.Token && Page.Home ? '' : 'active bg-white rounded-5'}`} role="presentation">
            <button className={`nav-link rounded-5 ${currentPage === Page.Token && Page.Profile && Page.Home ? 'text-white' : 'text-Black'}`} onClick={handleSignOut}>Sign Out</button>
            {/* <button className="nav-link rounded-5" onClick={() => setCurrentPage(Page.About)} aria-selected={currentPage === Page.About}>Sign Out</button> */}
          </div>

        </div>

        {renderPage()}
      </div>
      ) : (
        // Page.Login
        <Login onLoginSuccess={handleLoginSuccess} />
      )
    }    
  </div>
  )
}

export default App
