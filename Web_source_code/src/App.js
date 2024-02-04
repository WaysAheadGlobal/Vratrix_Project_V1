import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, useLocation } from 'react-router-dom';
import './App.css';
import './index.css';
import about_us from "./pages/about_us.js";
import contact_us from "./pages/contact_us.js";
import dashboard from "./pages/dashboard.js";
import home from "./pages/home.js";
import login from "./pages/login.js";
import Payment from './pages/payment.js';
import plans from "./pages/plans.js";
import signup from "./pages/signup.js";
import { Subscription } from './pages/subscription.js';
import Animation from './pages/workshop-animation.js';
import Flow from './pages/workshop-flow.js';
import workshop from "./pages/workshop.js";

/* import './output.css'; */


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
        <Route path='/animation' exact component={Animation} />
        {/* <Route path='/flow' exact component={Flow} /> */}
        <Route path='/payment' exact component={Payment} />
        <Route path='/subscription' exact component={Subscription} />
      </Switch>

    </Router>
  );
}

export default App;
