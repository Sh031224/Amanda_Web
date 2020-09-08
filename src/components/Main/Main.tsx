import React from "react";
import "./Main.scss";
import { AiOutlineSearch } from "react-icons/ai";

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
              <span className="Main-search-inputbox-box-div-span">검색</span>
              <AiOutlineSearch className="Main-search-inputbox-box-div-icon" />
            </div>
          </div>
        </div>
        <div className="Main-profile">
          <div className="Main-profile-box">
            <div className="Main-profile-box-left">
              <div className="Main-profile-box-left-img"></div>
            </div>
            <div className="Main-profile-box-right">
              <div className="Main-profile-box-right-name">
                <span>정성훈</span>
              </div>
              <div className="Main-profile-box-right-line">
                <span>나랑 다이칠사람</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
