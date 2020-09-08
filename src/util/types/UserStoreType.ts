export interface LoginResponse {
  status: number;
  refreshToken: string;
  accessToken: string;
  message: string;
}

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

export interface GetUserInfoResponse {
  status: number;
  message: string;
  data: UserInfoType;
}
