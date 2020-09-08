import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import token from "../util/lib/token";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return token() ? <MainPage /> : <Redirect to="/login" />;
          }}
        />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
