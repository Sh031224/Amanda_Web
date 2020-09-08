import React from "react";
import { UserInfoType } from "../../util/types/UserStoreType";
import "./Main.scss";
import MainItem from "./MainItem";

interface MainProps {
  infoList: UserInfoType[];
}

const Main = ({ infoList }: MainProps) => {
  return (
    <div className="main">
      <div className="main-box">
        {infoList.map((data: UserInfoType, index: number) => {
          return <MainItem key={index} data={data} />;
        })}
      </div>
    </div>
  );
};

export default Main;
