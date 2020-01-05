import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./redux/user/Store";

import DisplayUser from "./component/DisplayUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RegisterPage from "./component/RegisterPage";
import "./css/styles.css";

function App() {
  return (
    <Switch>
      <Provider store={Store}>
        <div className="App">
          <Route path="/" exact component={RegisterPage} />
          <Route path="/display" component={DisplayUser} />
        </div>
      </Provider>
    </Switch>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  rootElement
);
