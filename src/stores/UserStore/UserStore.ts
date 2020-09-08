import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import UserApi from "../../assets/api/User";
import { LoginResponse } from "../../util/types/UserStoreType";
import { sha256 } from "js-sha256";

@autobind
class UserStore {
  @observable login: boolean;

  constructor() {
    this.login = false;
  }

  @action
  tryLogin = async (id: string, pw: string): Promise<LoginResponse> => {
    try {
      const response: LoginResponse = await UserApi.Login(sha256(id), pw);

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
        sha256(id),
        pw,
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
}

export default UserStore;
