import React from "react";
import generateURL from "../../util/lib/generateURL";
import { UserInfoType } from "../../util/types/UserStoreType";
import "./Profile.scss";
import { GoPencil } from "react-icons/go";
import { RiImageAddLine } from "react-icons/ri";
import { AiTwotoneStar } from "react-icons/ai";
import ProfileComment from "./ProfileComment";
import Rate from "rc-rate";
import axios from "axios";
import { SERVER } from "../../config/config.json";
import "../../util/star.scss";
import { GetInfoListResponse } from "../../util/types/ShowStoreType";

interface ProfileProps {
  info: UserInfoType[];
  myInfo: UserInfoType;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getInfo: (id: string) => Promise<GetInfoListResponse>;
  search: string;
  myStar: number;
  loading: boolean;
  getInfoCallback: () => Promise<void>;
}

const Profile = ({
  info,
  myInfo,
  setEdit,
  handleImageChange,
  getInfo,
  search,
  myStar,
  loading,
  getInfoCallback
}: ProfileProps) => {
  const onChange = async (value: number) => {
    const star = value * 10;
    await axios.post(
      `${SERVER}/updateStar`,
      {
        idx: info[0].idx,
        star: star
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
    );
    getInfoCallback();
  };

  // console.log(myStar);

  return (
    <div className="profile">
      <div className="profile-box">
        <div className="profile-box-bg">
          <div className="profile-box-bg-area" />
          <div className="profile-box-bg-content">
            {info[0] && info[0].image && (
              <>
                <img
                  src={generateURL(info[0].image)}
                  className="profile-box-bg-content-img"
                />
                {info[0].idx === myInfo.idx && (
                  <div className="profile-box-bg-content-upload">
                    <label htmlFor="file">
                      <RiImageAddLine />
                    </label>
                    <input
                      onChange={handleImageChange}
                      id="file"
                      type="file"
                      accept="image/png, image/jpeg"
                    />
                  </div>
                )}
                <div className="profile-box-bg-content-name">
                  <span>{info[0].name}</span>
                  <div className="profile-box-bg-content-star">
                    <AiTwotoneStar />
                    <span>
                      {info[0].count! !== 0 &&
                        info[0].star! / 10 / info[0].count!}
                    </span>
                  </div>
                </div>
                <div className="profile-box-bg-content-description">
                  <span>{info[0].description}</span>
                  {info[0].idx === myInfo.idx && (
                    <GoPencil onClick={() => setEdit(true)} />
                  )}
                </div>
                {!loading && (
                  <>
                    <Rate
                      defaultValue={myStar}
                      onChange={onChange}
                      style={{ fontSize: 40 }}
                      allowHalf
                      allowClear={false}
                    />
                  </>
                )}
                <ProfileComment myInfo={myInfo} id={info[0].user_id!} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Profile);
