export interface UserInfoType {
  idx?: number;
  user_id?: string;
  pw?: string;
  name?: string;
  description?: string;
  image?: string;
  is_manager?: boolean;
  joined_at?: Date;
}

export interface ProfileStoreType {
  status: number;
  data: UserInfoType;
}
export interface GetUserStarRespose {
  status?: number;
  message?: string;
  "참여자 수"?: number;
  평점?: number;
}
