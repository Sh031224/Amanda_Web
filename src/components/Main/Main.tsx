import React from "react";
import "./Main.scss";

interface MainProps {}

const Main = ({}: MainProps) => {
  return (
    <>
      <div className="Main">
        <div className="Main-search">
          <span className="Main-search-logo">Amanda</span>
          <div className="Main-search-inputbox">
            <input className="Main-search-inputbox-input" />
            <div className="Main-search-inputbox-box">
              <span className="Main-search-inputbox-box-span">검색</span>
            </div>
          </div>
        </div>
        <div className="Main-profile">
          <div className="Main-profile-box">
            <div className="Main-profile-box-top">
              <div className="Main-profile-box-top-img"></div>
            </div>
            <div className="Main-profile-box-bottom">
              <div className="Main-profile-box-bottom-name">
                <span>정성훈</span>
              </div>
              <div className="Main-profile-box-bottom-line">
                <span>
                  동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
                  만세 무궁화
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
