import { UserInfoType } from "./UserStoreType";

export interface GetInfoListResponse {
  status: number;
  message: string;
  data: UserInfoType[];
}
