import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Profile from "../../components/Profile";
import ShowStore from "../../stores/ShowStore";
import UserStore from "../../stores/UserStore";

interface ProfileContainerProps {
  store?: StoreType;
}

interface StoreType {
  ShowStore: ShowStore;
  UserStore: UserStore;
}

const ProfileContainer = ({ store }: ProfileContainerProps) => {
  const { search } = useLocation();
  const history = useHistory();

  const { infoList, getInfo } = store!.ShowStore;
  const { myInfo, updateMyInfo, uploadProfile } = store!.UserStore;

  const [file, setFile] = useState<File>();
  const [edit, setEdit] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      let file = e.target.files[0];
      setFile(file);
    } else {
      toast.warning("취소되었습니다.");
    }
  };

  useEffect(() => {
    if (file) {
      uploadProfile(file).then(() => {
        history.go(0);
        toast.success("수정되었습니다.");
      });
    }
  }, [file]);

  useEffect(() => {
    if (edit) {
      const description = prompt(
        "수정할 내용을 입력하세요.",
        myInfo.description
      );
      if (!description) {
        toast.warning("취소되었습니다.");
      } else {
        updateMyInfo(description).then(() => {
          toast.success("수정되었습니다.");
          getInfo(search.replace("?id=", ""));
        });
      }
      setEdit(false);
    }
  }, [edit, myInfo]);

  useEffect(() => {
    if (search.replace("?id=", "") !== "") {
      getInfo(search.replace("?id=", ""));
    } else {
      history.push("/");
    }
  }, [getInfo, search]);

  return (
    <>
      <Profile
        info={infoList}
        myInfo={myInfo}
        setEdit={setEdit}
        handleImageChange={handleImageChange}
      />
    </>
  );
};

export default inject("store")(observer(ProfileContainer));
