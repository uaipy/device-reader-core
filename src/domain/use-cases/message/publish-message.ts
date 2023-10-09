import { MessageRepository } from "../../interfaces/repositories/message-repository";
import { PublishMessageUseCase } from "../../interfaces/use-cases/publish-message-use-case";
import { MessageRequestModel } from "../../models/message";

export class PublishMessage implements PublishMessageUseCase {
  messageRepository: MessageRepository;
  constructor(
    messageRepository: MessageRepository,
  ) {
    this.messageRepository = messageRepository;
  }

  async execute(message: MessageRequestModel) {
    console.log('create message', message);
    const repositoryResponse = await this.messageRepository.createMessage({
      deviceId: message.deviceId,
      data: message.data,
      messageReadDate: message.messageReadDate,
    });
    console.log('message created', repositoryResponse);
    return { success: true };
  }
}
