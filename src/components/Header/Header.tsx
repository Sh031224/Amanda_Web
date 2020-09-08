import React from "react";
import generateURL from "../../util/lib/generateURL";
import { UserInfoType } from "../../util/types/UserStoreType";
import "./Header.scss";

interface HeaderProps {
  myInfo: UserInfoType;
}

const Header = ({ myInfo }: HeaderProps) => {
  return (
    <div className="header">
      <div className="header-box">
        <div className="header-box-logo">Amanda</div>
        <div className="header-box-search">
          <input type="text" placeholder="검색어를 입력하세요." />
        </div>
        <div className="header-box-profile">
          {myInfo && myInfo.image && (
            <>
              <img src={generateURL(myInfo.image)} />
              <span>{myInfo.name}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
