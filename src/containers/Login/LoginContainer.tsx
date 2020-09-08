import React, { useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Login from "../../components/Login";
import UserStore from "../../stores/UserStore";
import Register from "../../components/Register";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginContainerProps {
  store?: StoreType;
}

interface StoreType {
  UserStore: UserStore;
}

const LoginContainer = ({ store }: LoginContainerProps) => {
  const { tryLogin } = store!.UserStore;

  const history = useHistory();

  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const [isRegister, setIsRegister] = useState<boolean>(false);

  const tryLoginCallback = useCallback(async () => {
    tryLogin(id, pw)
      .then((res) => {
        toast.success("로그인 되었습니다.");
        history.push("/");
      })
      .catch((err) => {
        toast.error("로그인에 실패하였습니다.");
      });
  }, [id, pw]);

  useEffect(() => {
    setId("");
    setPw("");
  }, [isRegister]);

  return (
    <>
      <Login
        id={id}
        setId={setId}
        pw={pw}
        setPw={setPw}
        setIsRegister={setIsRegister}
        tryLoginCallback={tryLoginCallback}
      />
      {/* <Register /> */}
    </>
  );
};

export default inject("store")(observer(LoginContainer));
