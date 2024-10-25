import { MessageRepository } from "../../interfaces/repositories/message-repository";
import { CallRemoteClientUseCase } from "../../interfaces/use-cases/call-remote-client-use-case";
import { PublishMessageUseCase } from "../../interfaces/use-cases/publish-message-use-case";
import { MessageRequestModel } from "../../models/message";

export class PublishMessage implements PublishMessageUseCase {
  messageRepository: MessageRepository;
  callRemoteClient: CallRemoteClientUseCase;

  constructor(
    messageRepository: MessageRepository,
    callRemoteClient: CallRemoteClientUseCase
  ) {
    this.messageRepository = messageRepository;
    this.callRemoteClient = callRemoteClient;
  }

  async execute(message: MessageRequestModel) {
    console.log('create message', message);
    const repositoryResponse = await this.messageRepository.createMessage({
      deviceId: message.deviceId,
      data: message.data,
      isSyncedRemotely: false,
      messageReadDate: message.messageReadDate,
    });
    console.log('message created', repositoryResponse);
    const clientResponse = await this.callRemoteClient.execute({
      localDeviceId: repositoryResponse.deviceId,
      messageId: repositoryResponse.id,
      data: repositoryResponse.data,
      createdAt: repositoryResponse.messageReadDate,
    });
    console.log('publish message', clientResponse);
    if (clientResponse.success) {
      await this.messageRepository.updateSyncedRemotely(
        repositoryResponse.id,
        true
      );
      await this.publishBatchMessages();
    }
    return { success: true };
  }

  private async publishBatchMessages(): Promise<void> {
    const messagesToBeSynchronized =
      await this.messageRepository.getUnsynchronizedMessagesRemotely();
    if (!messagesToBeSynchronized) return;
    const clientResponse = await this.callRemoteClient.executeBatch(
      messagesToBeSynchronized.map((element) => ({
        localDeviceId: element.deviceId,
        messageId: element.id,
        data: element.data,
        createdAt: element.messageReadDate,
      }))
    );
    if (clientResponse.success) {
      messagesToBeSynchronized.forEach(
        async (element) =>
          await this.messageRepository.updateSyncedRemotely(element.id, true)
      );
    }
  }
}
