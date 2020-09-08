import React, { useEffect, useState } from "react";
import generateURL from "../../../util/lib/generateURL";
import { UserInfoType } from "../../../util/types/UserStoreType";
import { AiTwotoneStar } from "react-icons/ai";
import "./MainItem.scss";
import ShowStore from "../../../stores/ShowStore";
import { GetUserStarRespose } from "../../../util/types/ShowStoreType";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

interface MainItemProps {
  data: UserInfoType;
  store?: StoreType;
}

interface StoreType {
  ShowStore: ShowStore;
}

const MainItem = ({ data, store }: MainItemProps) => {
  const { getUserStar } = store!.ShowStore;

  const [star, setStar] = useState<number>(0);

  useEffect(() => {
    if (data.idx) {
      getUserStar(data.idx).then((res: GetUserStarRespose) => {
        setStar(res.평점 / 10);
      });
    }
  }, []);

  return (
    <Link to={`/profile?idx=${data.idx}`}>
      <div className="main-item">
        <img src={generateURL(data.image!)} />
        <div className="main-item-content">
          <div className="main-item-content-name">
            {data.name}
            <AiTwotoneStar />
            <span>{star}</span>
          </div>

          <div className="main-item-content-description">
            {data.description}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default inject("store")(observer(MainItem));
