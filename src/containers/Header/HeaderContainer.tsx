import React from "react";
import { inject, observer } from "mobx-react";
import Header from "../../components/Header";
import UserStore from "../../stores/UserStore";

interface HeaderContainerProps {
  store?: StoreType;
}

interface StoreType {
  UserStore: UserStore;
}

const HeaderContainer = ({ store }: HeaderContainerProps) => {
  const { myInfo } = store!.UserStore;

  return (
    <>
      <Header myInfo={myInfo} />
    </>
  );
};

export default inject("store")(observer(HeaderContainer));
