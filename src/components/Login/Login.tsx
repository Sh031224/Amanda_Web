import React from "react";
import "./Login.scss";
import logo from "../../assets/images/logo.svg";
import bubble from "../../assets/images/bubble.png";
import loginText from "../../assets/images/login-text.png";
import Register from "../Register";

interface LoginProps {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  pw: string;
  setPw: React.Dispatch<React.SetStateAction<string>>;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  tryLoginCallback: () => Promise<void>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  tryRegisterCallback: () => Promise<void>;
}

const Login = ({
  id,
  setId,
  pw,
  setPw,
  setIsRegister,
  tryLoginCallback,
  name,
  setName,
  tryRegisterCallback
}: LoginProps) => {
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
        <div className="login-box-right">
          <div className="login-box-right-content">
            <div className="login-box-right-content-title">{"Login"}</div>
            <div className="login-box-right-content-form">
              <span>{"ID"}</span>
              <input
                type="text"
                placeholder="Enter your id"
                value={id}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setId(e.target.value)
                }
                autoFocus
              />
              <div className="line" />
            </div>
            <div className="login-box-right-content-form">
              <span>{"Password"}</span>
              <input
                value={pw}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPw(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.keyCode === 13) {
                    tryLoginCallback();
                  }
                }}
                type="password"
                placeholder="Enter your password"
              />
              <div className="line" />
            </div>
            <div
              className="login-box-right-content-submit"
              onClick={() => tryLoginCallback()}
            >
              로그인
            </div>
            <div className="login-box-right-content-register">
              <span onClick={() => setIsRegister(true)}>
                {"계정이 없으신가요?"}
              </span>
            </div>
          </div>
        </div>
        <Register
          setIsRegister={setIsRegister}
          id={id}
          setId={setId}
          pw={pw}
          setPw={setPw}
          name={name}
          setName={setName}
          tryRegisterCallback={tryRegisterCallback}
        />
      </div>
    </div>
  );
};

export default Login;
