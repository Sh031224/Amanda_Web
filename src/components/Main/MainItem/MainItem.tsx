import React from "react";
import generateURL from "../../../util/lib/generateURL";
import { UserInfoType } from "../../../util/types/UserStoreType";
import { AiTwotoneStar } from "react-icons/ai";
import "./MainItem.scss";

interface MainItemProps {
  data: UserInfoType;
}

const MainItem = ({ data }: MainItemProps) => {
  return (
    <div className="main-item">
      <img src={generateURL(data.image!)} />
      <div className="main-item-content">
        <div className="main-item-content-name">{data.name}</div>
        <div className="main-item-content-star">
          <AiTwotoneStar />
        </div>
        <div className="main-item-content-description">{data.description}</div>
      </div>
    </div>
  );
};

export default MainItem;
