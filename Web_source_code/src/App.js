import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import logo from './logo.svg';
import Navbar from './components/navbar'
import Footer from './components/footer'
import './App.css';
import home from "./pages/home.js"
import login from "./pages/login.js"
import signup from "./pages/signup.js"
import plans from "./pages/plans.js"
import dashboard from "./pages/dashboard.js"
import about_us from "./pages/about_us.js"
import contact_us from "./pages/contact_us.js"
import workshop from "./pages/workshop.js"

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  document.body.style = 'background: #ffffffff';
  return (
    <Router 
    basename={process.env.REACT_APP_BASENAME || ""}>
      
      <ScrollToTop />
      <Switch>
      
      <Route path='/' exact component={home} />
      <Route path='/log-in' exact component={login} />
      <Route path='/sign-up' exact component={signup} />
      <Route path='/dashboard' exact component={dashboard} />
      <Route path='/plans' exact component={plans} />
      <Route path='/about-us' exact component={about_us} />
      <Route path='/contact-us' exact component={contact_us} />
      <Route path='/workshop' exact component={workshop} />
      </Switch>
      
    </Router>
  );
}

export default App;
