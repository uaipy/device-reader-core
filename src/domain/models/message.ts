export interface MessageRequestModel {
  deviceId: number;
  data: any;
  messageReadDate: Date;
}

export interface MessageResponseModel {
  id: number;
  deviceId: number;
  data: any;
  messageReadDate: Date;
}
