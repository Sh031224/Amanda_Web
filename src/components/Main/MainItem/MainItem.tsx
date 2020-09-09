import React, { useEffect, useState } from "react";
import generateURL from "../../../util/lib/generateURL";
import { UserInfoType } from "../../../util/types/UserStoreType";
import { AiTwotoneStar } from "react-icons/ai";
import "./MainItem.scss";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

interface MainItemProps {
  data: UserInfoType;
}

const MainItem = ({ data }: MainItemProps) => {
  return (
    <>
      {data.image && (
        <div className="main-item">
          <img src={generateURL(data.image!)} />
          <div className="main-item-content">
            <Link to={`/profile?id=${data.user_id}`}>
              <div className="main-item-content-name">
                {data.name}
                <AiTwotoneStar />
                <span>
                  {data.count! !== 0 &&
                    parseFloat(
                      ((data.star! * 10) / 100 / data.count!).toString()
                    ).toFixed(1)}
                </span>
              </div>
            </Link>
            <Link to={`/profile?id=${data.user_id}`}>
              <div className="main-item-content-description">
                {data.description}
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default inject("store")(observer(MainItem));
