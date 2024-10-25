import {
  MessageRequestModel,
  MessageResponseModel,
} from "../../../domain/models/message.js";

export interface MessageDataSource {
  create(contact: MessageRequestModel): Promise<MessageResponseModel>;
  getAll(): Promise<MessageResponseModel[]>;
  updateSyncedRemotely(
    messageId: number,
    isSyncedRemotely: boolean
  ): Promise<void>;
  getUnsynchronizedMessagesRemotely(): Promise<
    MessageResponseModel[] | undefined
  >;
}
