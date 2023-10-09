import {
  MessageRequestModel,
  MessageResponseModel,
} from "../../../domain/models/message.js";

export interface MessageDataSource {
  create(contact: MessageRequestModel): Promise<MessageResponseModel>;
  getAll(): Promise<MessageResponseModel[]>;
}
