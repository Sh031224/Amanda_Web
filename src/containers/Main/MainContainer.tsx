import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Main from "../../components/Main";
import ShowStore from "../../stores/ShowStore";
import UserStore from "../../stores/UserStore";
import { GetUserInfoResponse } from "../../util/types/UserStoreType";

interface MainContainerProps {
  store?: StoreType;
}

interface StoreType {
  UserStore: UserStore;
  ShowStore: ShowStore;
}

const MainContainer = ({ store }: MainContainerProps) => {
  const { infoList, getInfoList } = store!.ShowStore;

  useEffect(() => {
    getInfoList();
  }, [getInfoList]);

  return (
    <>
      <Main infoList={infoList} />
    </>
  );
};

export default inject("store")(observer(MainContainer));
