import React, { useCallback, useEffect, useState } from "react";

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

  const [search, setSearch] = useState<string>("");

  const onSubmit = useCallback(() => {
    if (search !== "") {
      history.push(`/?query=${search}`);
    } else {
      history.push("/");
    }
  }, [search]);

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

  const deleteToken = (): any => {
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <>
      <Header
        myInfo={myInfo}
        search={search}
        setSearch={setSearch}
        onSubmit={onSubmit}
        deleteToken={deleteToken}
      />
    </>
  );
};

export default inject("store")(observer(HeaderContainer));
