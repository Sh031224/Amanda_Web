import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Main from "../../components/Main";
import UserStore from "../../stores/UserStore";
import { GetUserInfoResponse } from "../../util/types/UserStoreType";

interface MainContainerProps {
  store?: StoreType;
}

interface StoreType {
  UserStore: UserStore;
}

const MainContainer = ({ store }: MainContainerProps) => {
  const history = useHistory();

  const { getMyInfo } = store!.UserStore;

  useEffect(() => {
    getMyInfo()
      .then((res: GetUserInfoResponse) => {
        if (res.data.image === "") {
          history.push("/start");
        }
      })
      .catch((err) => {
        history.push("/login");
      });
  }, [getMyInfo]);

  return (
    <>
      <Main />
    </>
  );
};

export default inject("store")(observer(MainContainer));
