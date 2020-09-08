import React, { useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import Start from "../../components/Start";
import UserStore from "../../stores/UserStore";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

interface StartContainerProps {
  store?: StoreType;
}

interface StoreType {
  UserStore: UserStore;
}

const StartContainer = ({ store }: StartContainerProps) => {
  const { uploadProfile, updateMyInfo } = store!.UserStore;

  const history = useHistory();

  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [description, setDescription] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    if (e.target.files && e.target.files.length) {
      let file = e.target.files[0];
      reader.onloadend = () => {
        setFile(file);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFile(undefined);
      setPreview("");
    }
  };

  const uploadProfileCallback = useCallback(async () => {
    if (file && description) {
      await uploadProfile(file).catch((err) => {
        toast.error("오류가 발생하였습니다.");
      });
      await updateMyInfo(description).catch((err) => {
        toast.error("오류가 발생하였습니다.");
      });
      history.push("/");
    } else if (description === "") {
      toast.warning("빈칸을 입력해주세요.");
    } else {
      toast.warning("사진을 선택해주세요.");
    }
  }, [file, description]);

  return (
    <>
      <Start
        handleImageChange={handleImageChange}
        preview={preview}
        uploadProfileCallback={uploadProfileCallback}
        description={description}
        setDescription={setDescription}
      />
    </>
  );
};

export default inject("store")(observer(StartContainer));
