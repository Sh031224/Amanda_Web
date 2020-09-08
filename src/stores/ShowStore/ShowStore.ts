import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import ShowApi from "../../assets/api/Show";
import { UserInfoType } from "../../util/types/UserStoreType";
import {
  GetInfoListResponse,
  GetUserStarRespose
} from "../../util/types/ShowStoreType";

@autobind
class ShowStore {
  @observable infoList: UserInfoType[];

  constructor() {
    this.infoList = [];
  }

  @action
  getInfoList = async (query?: string): Promise<GetInfoListResponse> => {
    try {
      if (query) {
        const response: GetInfoListResponse = await ShowApi.GetAllInfo(query);

        let tempData: UserInfoType[] = [];

        const promise: Promise<number[]>[] = [];
        response.data.map((data: UserInfoType, index: number) => {
          promise.push(this.getUserStar(data.idx!));
        });

        const result = await Promise.all(promise);

        response.data.map((data: UserInfoType, i: number) => {
          data.star = result[i][0];
          data.count = result[i][1];
          tempData.push(data);
        });

        tempData.sort((a: UserInfoType, b: UserInfoType) => {
          console.log(1);
          return a.star! > b.star! ? -1 : a.star! < b.star! ? 1 : 0;
        });

        this.infoList = tempData;

        return response;
      } else {
        const response: GetInfoListResponse = await ShowApi.GetAllInfo();

        let tempData: UserInfoType[] = [];

        const promise: Promise<number[]>[] = [];
        response.data.map((data: UserInfoType, index: number) => {
          promise.push(this.getUserStar(data.idx!));
        });

        const result = await Promise.all(promise);

        response.data.map((data: UserInfoType, i: number) => {
          data.star = result[i][0];
          data.count = result[i][1];
          tempData.push(data);
        });

        tempData.sort((a: UserInfoType, b: UserInfoType) => {
          console.log(1);
          return a.star! > b.star! ? -1 : a.star! < b.star! ? 1 : 0;
        });

        this.infoList = tempData;

        return response;
      }
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  getUserStar = async (idx: number): Promise<number[]> => {
    try {
      const response: GetUserStarRespose = await ShowApi.GetUserStar(idx);

      return [response.평점, response["참여자 수"]];
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };
}

export default ShowStore;
