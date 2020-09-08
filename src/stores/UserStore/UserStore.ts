import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import UserApi from "../../assets/api/User";
import {
  GetUserInfoResponse,
  LoginResponse,
  UserInfoType
} from "../../util/types/UserStoreType";
import { sha256 } from "js-sha256";

@autobind
class UserStore {
  @observable login: boolean;
  @observable myInfo: UserInfoType;

  constructor() {
    this.login = false;
    this.myInfo = {};
  }

  @action
  tryLogin = async (id: string, pw: string): Promise<LoginResponse> => {
    try {
      const response: LoginResponse = await UserApi.Login(id, sha256(pw));

      if (response.status === 200) {
        this.login = true;
        localStorage.setItem("token", response.accessToken);
      }

      return new Promise(
        (resolve: (response: LoginResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      this.login = false;
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  tryRegister = async (
    id: string,
    pw: string,
    name: string
  ): Promise<ResponseType> => {
    try {
      const response: ResponseType = await UserApi.Register(
        id,
        sha256(pw),
        name
      );

      return new Promise(
        (resolve: (response: ResponseType) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  getMyInfo = async (): Promise<GetUserInfoResponse> => {
    try {
      const response: GetUserInfoResponse = await UserApi.GetMyInfo();

      this.myInfo = response.data;

      return new Promise(
        (resolve: (response: GetUserInfoResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  uploadProfile = async (file: File): Promise<ResponseType> => {
    try {
      const response: ResponseType = await UserApi.UploadProfile(file);

      return new Promise(
        (resolve: (response: ResponseType) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  updateMyInfo = async (description: string): Promise<ResponseType> => {
    try {
      if (this.myInfo && this.myInfo.name) {
        const response: ResponseType = await UserApi.UpdateMyInfo(
          this.myInfo.name,
          description
        );

        return new Promise(
          (resolve: (response: ResponseType) => void, reject) => {
            resolve(response);
          }
        );
      } else {
        await this.getMyInfo();

        const response: ResponseType = await UserApi.UpdateMyInfo(
          this.myInfo.name!,
          description
        );

        return new Promise(
          (resolve: (response: ResponseType) => void, reject) => {
            resolve(response);
          }
        );
      }
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };
}

export default UserStore;
