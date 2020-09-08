import React from "react";
import { Link, useHistory } from "react-router-dom";
import generateURL from "../../util/lib/generateURL";
import { UserInfoType } from "../../util/types/UserStoreType";
import "./Header.scss";

interface HeaderProps {
  myInfo: UserInfoType;
  onSubmit: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ myInfo, search, setSearch, onSubmit }: HeaderProps) => {
  const history = useHistory();

  return (
    <div className="header">
      <div className="header-box">
        <div className="header-box-logo" onClick={() => history.push("/")}>
          Amanda
        </div>
        <div className="header-box-search">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.keyCode === 13) {
                onSubmit();
              }
            }}
          />
        </div>
        <Link to={`/profile?id=${myInfo.user_id}`}>
          <div className="header-box-profile">
            {myInfo && myInfo.image && (
              <>
                <img src={generateURL(myInfo.image)} />
                <span>{myInfo.name}</span>
              </>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
