import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";
import { Login, Profile, Quotes } from "./Components";
import useGlobal from "./store";

function App() {
  const [globalState] = useGlobal();
  const {
    security: { user, accessToken },
  } = globalState;
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-dark bg-dark navbar-extend-lg">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {user ? (
              ""
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {accessToken ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/quotes">
                    Quotes
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/quotes" component={Quotes} />
          <Route path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
