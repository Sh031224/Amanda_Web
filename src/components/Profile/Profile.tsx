import React from "react";
import generateURL from "../../util/lib/generateURL";
import { UserInfoType } from "../../util/types/UserStoreType";
import "./Profile.scss";
import { GoPencil } from "react-icons/go";
import { RiImageAddLine } from "react-icons/ri";
import { AiTwotoneStar } from "react-icons/ai";

interface ProfileProps {
  info: UserInfoType[];
  myInfo: UserInfoType;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Profile = ({
  info,
  myInfo,
  setEdit,
  handleImageChange
}: ProfileProps) => {
  return (
    <div className="profile">
      <div className="profile-box">
        <div className="profile-box-bg">
          <div className="profile-box-bg-area" />
          <div className="profile-box-bg-content">
            {info[0] && info[0].image && (
              <>
                <img src={generateURL(info[0].image)} />
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
                  {info[0].name}
                </div>
                <div className="profile-box-bg-content-description">
                  {info[0].description}
                  {info[0].idx === myInfo.idx && (
                    <GoPencil onClick={() => setEdit(true)} />
                  )}
                </div>
                <div className="profile-box-bg-content-star">
                  <AiTwotoneStar />
                  <span>{info[0].star! / 10}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
