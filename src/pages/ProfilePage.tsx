import React from "react";
import MainTemplate from "../components/common/Template/MainTemplate";
import ProfileContainer from "../containers/Profile/ProfileContainer";

const ProfilePage = () => {
  return (
    <MainTemplate>
      <ProfileContainer />
    </MainTemplate>
  );
};

export default ProfilePage;
