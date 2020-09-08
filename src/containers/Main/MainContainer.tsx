import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Main from "../../components/Main";
import ShowStore from "../../stores/ShowStore";
import UserStore from "../../stores/UserStore";

interface MainContainerProps {
  store?: StoreType;
}

interface StoreType {
  UserStore: UserStore;
  ShowStore: ShowStore;
}

const MainContainer = ({ store }: MainContainerProps) => {
  const { search } = useLocation();

  const { infoList, getInfoList } = store!.ShowStore;

  useEffect(() => {
    if (search.replace("?query=", "") !== "") {
      getInfoList(search.replace("?query=", ""));
    } else {
      getInfoList();
    }
  }, [getInfoList, search]);

  return (
    <>
      <Main infoList={infoList} />
    </>
  );
};

export default inject("store")(observer(MainContainer));
