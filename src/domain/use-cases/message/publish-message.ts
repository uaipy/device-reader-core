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
      integrationCode: process.env.INTEGRATION_CODE as string || "",
      data: repositoryResponse.data,
      messageReadDate: repositoryResponse.messageReadDate,
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
        integrationCode: process.env.INTEGRATION_CODE as string || "",
        data: element.data,
        messageReadDate: element.messageReadDate,
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
