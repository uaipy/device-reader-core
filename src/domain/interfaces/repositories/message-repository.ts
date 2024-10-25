import {
  MessageRequestModel,
  MessageResponseModel,
} from "../../models/message";

export interface MessageRepository {
  createMessage(message: MessageRequestModel): Promise<MessageResponseModel>;
  getMessages(): Promise<MessageResponseModel[]>;
  updateSyncedRemotely(
    messageId: number,
    isSyncedRemotely: boolean
  ): Promise<void>;
  getUnsynchronizedMessagesRemotely(): Promise<
    MessageResponseModel[] | undefined
  >;
}
