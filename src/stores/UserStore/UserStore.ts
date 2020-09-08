import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import UserApi from "../../assets/api/User";
import { LoginResponse } from "../../util/types/UserStoreType";

@autobind
class UserStore {
  @observable login: boolean;

  constructor() {
    this.login = false;
  }

  @action
  tryLogin = async (id: string, pw: string): Promise<LoginResponse> => {
    try {
      const response: LoginResponse = await UserApi.Login(id, pw);

      if (response.status === 200) {
        this.login = true;
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

  // @action
  // getPostCommentCount = async (
  //   idx: number
  // ): Promise<GetPostCommentCountResponse> => {
  //   try {
  //     const response: GetPostCommentCountResponse = await Post.GetPostCommentCount(
  //       idx
  //     );

  //     return new Promise(
  //       (resolve: (response: GetPostCommentCountResponse) => void, reject) => {
  //         resolve(response);
  //       }
  //     );
  //   } catch (error) {
  //     return new Promise((resolve, reject: (error: Error) => void) => {
  //       reject(error);
  //     });
  //   }
  // };
}

export default UserStore;
