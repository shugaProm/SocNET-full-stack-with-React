import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { clearCurrentProfile } from "./actions/profileActions";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

// check for token to ensure the browser refresh does not remove the redux state
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired tokens
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // log out user
    store.dispatch(logoutUser());

    store.dispatch(clearCurrentProfile());

    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
