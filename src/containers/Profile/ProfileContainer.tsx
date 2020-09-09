import { inject, observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Profile from "../../components/Profile";
import ShowStore from "../../stores/ShowStore";
import UserStore from "../../stores/UserStore";
import axios from "axios";
import { SERVER } from "../../config/config.json";
import { info } from "node-sass";
import { UserInfoType } from "../../util/types/UserStoreType";
import { GetInfoListResponse } from "../../util/types/ShowStoreType";

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

  const { getInfo, getUserStar } = store!.ShowStore;
  const { myInfo, updateMyInfo, uploadProfile } = store!.UserStore;

  const [file, setFile] = useState<File>();
  const [edit, setEdit] = useState<boolean>(false);
  const [myStar, setMyStar] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [infoList, setInfoList] = useState<UserInfoType[]>([]);

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

  const getInfoCallback = useCallback(async () => {
    await getInfo(search.replace("?id=", "")).then(
      async (res: GetInfoListResponse) => {
        let tempData: UserInfoType[] = [];

        const promise: Promise<number[]>[] = [];
        res.data.map((data: UserInfoType, index: number) => {
          promise.push(getUserStar(data.idx!));
        });

        const result = await Promise.all(promise);

        res.data.map((data: UserInfoType, i: number) => {
          data.star = result[i][0];
          data.count = result[i][1];
          tempData.push(data);
        });
        setInfoList(tempData);
      }
    );
  }, [getInfo, search]);

  const editCallback = useCallback(() => {
    const description = prompt(
      "수정할 내용을 입력하세요.",
      infoList[0].description
    );
    if (!description) {
      toast.warning("취소되었습니다.");
    } else {
      updateMyInfo(description).then(() => {
        toast.success("수정되었습니다.");
        getInfoCallback();
      });
    }
    setEdit(false);
  }, [infoList]);

  useEffect(() => {
    if (edit) {
      editCallback();
    }
  }, [edit]);

  const getMyStar = useCallback(async () => {
    await axios
      .get(`${SERVER}/showMyStar`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then((res: any) => {
        if (res.data.data.length && infoList[0]) {
          res.data.data.map((data: any) => {
            if (data.fk_object_idx === infoList[0].idx) {
              setMyStar(data.star / 10);
            }
          });
        }
      });
    setLoading(false);
  }, [infoList, search]);

  useEffect(() => {
    if (search.replace("?id=", "") !== "") {
      getInfoCallback();
    } else {
      history.push("/");
    }
  }, [search]);

  useEffect(() => {
    if (infoList[0]) {
      getMyStar();
    }
  }, [infoList, search]);

  return (
    <>
      <Profile
        getInfoCallback={getInfoCallback}
        loading={loading}
        myStar={myStar}
        search={search}
        getInfo={getInfo}
        info={infoList}
        myInfo={myInfo}
        setEdit={setEdit}
        handleImageChange={handleImageChange}
      />
    </>
  );
};

export default inject("store")(observer(ProfileContainer));
