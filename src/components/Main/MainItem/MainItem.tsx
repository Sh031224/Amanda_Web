import React from "react";
import generateURL from "../../../util/lib/generateURL";
import { UserInfoType } from "../../../util/types/UserStoreType";
import "./MainItem.scss";

interface MainItemProps {
  data: UserInfoType;
}

const MainItem = ({ data }: MainItemProps) => {
  return (
    <div className="main-item">
      <img src={generateURL(data.image!)} />
      <div>{data.name}</div>
    </div>
  );
};

export default MainItem;
