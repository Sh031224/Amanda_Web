import { UserInfoType } from "./UserStoreType";

export interface GetInfoListResponse {
  status: number;
  message: string;
  data: UserInfoType[];
}

export interface GetUserStarRespose {
  status: number;
  message: string;
  "참여자 수": number;
  평점: number;
}
