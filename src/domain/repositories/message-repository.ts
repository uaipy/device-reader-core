import { MessageDataSource } from "../../data/interfaces/data-sources/message-data-source";
import { MessageRepository } from "../interfaces/repositories/message-repository";
import { MessageRequestModel, MessageResponseModel } from "../models/message";

export class MessageRepositoryImpl implements MessageRepository {
  messageDataSource: MessageDataSource;

  constructor(messageDataSource: MessageDataSource) {
    this.messageDataSource = messageDataSource;
  }

  async createMessage(
    message: MessageRequestModel
  ): Promise<MessageResponseModel> {
    const result = await this.messageDataSource.create(message);
    return result;
  }

  async getMessages(): Promise<MessageResponseModel[]> {
    const result = await this.messageDataSource.getAll();
    return result;
  }

  async getUnsynchronizedMessagesRemotely(): Promise<
  MessageResponseModel[] | undefined
> {
  const result =
    await this.messageDataSource.getUnsynchronizedMessagesRemotely();
  return result;
}

  async updateSyncedRemotely(
    messageId: number,
    isSyncedRemotely: boolean
  ): Promise<void> {
    await this.messageDataSource.updateSyncedRemotely(
      messageId,
      isSyncedRemotely
    );
  }
}
