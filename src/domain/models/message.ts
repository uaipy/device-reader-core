export interface MessageRequestModel {
  deviceId: number;
  data: any;
  messageReadDate: Date;
  isSyncedRemotely: boolean;
}

export interface MessageResponseModel {
  id: number;
  deviceId: number;
  data: any;
  messageReadDate: Date;
  isSyncedRemotely: boolean;
}
