import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import {
  ProfileStoreType,
  GetUserStarRespose,
} from "../../util/types/ProfileStoreType";
import ProfileApi from "../../assets/api/Profile";
import { UserInfoType } from "../../util/types/UserStoreType";
import { error } from "console";

@autobind
class ProfileStore {
  @observable userData: UserInfoType;
  @observable userStar: GetUserStarRespose;

  constructor() {
    this.userData = {};
    this.userStar = {};
  }

  @action
  profile = async (id: string): Promise<ProfileStoreType> => {
    try {
      const response: ProfileStoreType = await ProfileApi.ShowUserInfo(id);
      if (response.status === 200) {
        this.userData = response.data;
        return response;
      }

      return new Promise(
        (resolve: (response: ProfileStoreType) => void, reject) => {
          reject(error);
        }
      );
    } catch (error) {
      return new Promise(
        (resolve: (response: ProfileStoreType) => void, reject) => {
          reject(error);
        }
      );
    }
  };
  star = async (idx: number): Promise<GetUserStarRespose> => {
    try {
      const response: GetUserStarRespose = await ProfileApi.ShowUserStar(idx);
      if (response.status === 200) {
        this.userStar = response;
        return response;
      }

      return new Promise(
        (resolve: (response: GetUserStarRespose) => void, reject) => {
          reject(error);
        }
      );
    } catch (error) {
      return new Promise(
        (resolve: (response: GetUserStarRespose) => void, reject) => {
          reject(error);
        }
      );
    }
  };
}

export default ProfileStore;
