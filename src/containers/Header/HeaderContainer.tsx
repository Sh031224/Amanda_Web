import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import Header from "../../components/Header";
import UserStore from "../../stores/UserStore";
import { useHistory } from "react-router-dom";
import { GetUserInfoResponse } from "../../util/types/UserStoreType";

interface HeaderContainerProps {
  store?: StoreType;
}

interface StoreType {
  UserStore: UserStore;
}

const HeaderContainer = ({ store }: HeaderContainerProps) => {
  const history = useHistory();

  const { myInfo, getMyInfo } = store!.UserStore;

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
      <Header myInfo={myInfo} />
    </>
  );
};

export default inject("store")(observer(HeaderContainer));
