import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import ShowApi from "../../assets/api/Show";
import { UserInfoType } from "../../util/types/UserStoreType";
import { GetInfoListResponse } from "../../util/types/ShowStoreType";

@autobind
class ShowStore {
  @observable infoList: UserInfoType[];

  constructor() {
    this.infoList = [];
  }

  @action
  getInfoList = async (): Promise<GetInfoListResponse> => {
    try {
      const response: GetInfoListResponse = await ShowApi.GetAllInfo();

      this.infoList = response.data;

      return response;
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };
}

export default ShowStore;
