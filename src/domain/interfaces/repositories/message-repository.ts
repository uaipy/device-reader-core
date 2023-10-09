import {
  MessageRequestModel,
  MessageResponseModel,
} from "../../models/message";

export interface MessageRepository {
  createMessage(message: MessageRequestModel): Promise<MessageResponseModel>;
  getMessages(): Promise<MessageResponseModel[]>;
}
