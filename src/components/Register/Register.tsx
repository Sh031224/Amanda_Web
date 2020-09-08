import React from "react";
import "./Register.scss";
import { RiArrowGoBackLine } from "react-icons/ri";

interface RegisterProps {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  pw: string;
  setPw: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setIsRegister: React.Dispatch<React.SetStateAction<boolean>>;
  tryRegisterCallback: () => Promise<void>;
}

const Register = ({
  setIsRegister,
  id,
  setId,
  pw,
  setPw,
  name,
  setName,
  tryRegisterCallback
}: RegisterProps) => {
  return (
    <div id="register" className="register">
      <div className="register-box">
        <RiArrowGoBackLine
          className="register-box-back"
          onClick={() => setIsRegister(false)}
        />
        <div className="register-box-title">{"SignUp"}</div>
        <div className="register-box-form">
          <span>{"ID"}</span>
          <input
            type="text"
            placeholder="Enter your id"
            value={id}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setId(e.target.value)
            }
          />
          <div className="line" />
        </div>
        <div className="register-box-form">
          <span>{"Password"}</span>
          <input
            type="password"
            placeholder="Enter your password"
            value={pw}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPw(e.target.value)
            }
          />
          <div className="line" />
        </div>
        <div className="register-box-form">
          <span>{"Name"}</span>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <div className="line" />
        </div>
        <div
          className="register-box-submit"
          onClick={() => tryRegisterCallback()}
        >
          회원가입
        </div>
      </div>
    </div>
  );
};

export default Register;
