import React, { useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Login from "../../components/Login";
import UserStore from "../../stores/UserStore";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginContainerProps {
  store?: StoreType;
}

interface StoreType {
  UserStore: UserStore;
}

const LoginContainer = ({ store }: LoginContainerProps) => {
  const { tryLogin, tryRegister } = store!.UserStore;

  const history = useHistory();

  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [name, setName] = useState<string>("");

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

  const tryRegisterCallback = useCallback(async () => {
    if (!id || !pw || !name) {
      toast.warning("빈칸을 입력해주세요.");
    } else {
      tryRegister(id, pw, name)
        .then((res) => {
          toast.success("가입 되었습니다.");
          history.push("/");
        })
        .catch((err) => {
          toast.error("가입에 실패하였습니다.");
        });
    }
  }, [id, pw, name]);

  useEffect(() => {
    if (isRegister) {
      (document.getElementById("register") as HTMLFormElement).style.right =
        "0";
    } else {
      (document.getElementById("register") as HTMLFormElement).style.right =
        "-800px";
    }
  }, [isRegister]);

  useEffect(() => {
    setId("");
    setPw("");
    setName("");
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
        name={name}
        setName={setName}
        tryRegisterCallback={tryRegisterCallback}
      />
    </>
  );
};

export default inject("store")(observer(LoginContainer));
