import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
