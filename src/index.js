import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./redux/user/Store";
import DisplayUser from "./component/DisplayUser";
import RegisterPage from "./component/RegisterPage";
import "./styles.css";

function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <RegisterPage />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
