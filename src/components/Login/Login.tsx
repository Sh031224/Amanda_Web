import React from "react";
import "./Login.scss";
import logo from "../../assets/images/logo.svg";
import bubble from "../../assets/images/bubble.png";
import loginText from "../../assets/images/login-text.png";

interface LoginProps {}

const Login = ({}: LoginProps) => {
  return (
    <div className="login">
      <div className="login-box">
        <div className="login-box-left">
          <div className="login-box-left-content">
            <img
              className="login-box-left-content-logo"
              src={logo}
              alt="logo"
            />
            <div className="login-box-left-content-text">
              {"아무도 만나지 못하는"}
              <span>{"당신을 위한 특별한 서비스"}</span>
            </div>
            <div className="login-box-left-content-main">
              <img src={loginText} alt="" />
            </div>
          </div>
          <img className="login-box-left-bubble" src={bubble} alt="bubble" />
        </div>
        <div className="login-box-right"></div>
      </div>
    </div>
  );
};

export default Login;
