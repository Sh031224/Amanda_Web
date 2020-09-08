import React from "react";
import "./Start.scss";
import { RiImageAddLine } from "react-icons/ri";
import { BsArrowReturnRight } from "react-icons/bs";

interface StartProps {
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | ArrayBuffer | null;
  uploadProfileCallback: () => Promise<void>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const Start = ({
  handleImageChange,
  preview,
  uploadProfileCallback,
  description,
  setDescription
}: StartProps) => {
  return (
    <div className="start">
      <div className="start-title">
        <b>Amanda</b> 에 오신것을 환영합니다 !
      </div>
      <div className="start-subtitle">
        서비스 이용을 위하여 프로필 이미지를 등록해주세요.
      </div>
      <div className="start-profile">
        {preview && <img src={preview.toString()} />}
        <div className="start-profile-upload">
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
      </div>
      <div className="start-description">
        <input
          type="text"
          placeholder="프로필 메시지를 작성해주세요."
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
        <div className="line" />
      </div>
      <div className="start-btn" onClick={() => uploadProfileCallback()}>
        시작하기
        <BsArrowReturnRight />
      </div>
    </div>
  );
};

export default Start;
