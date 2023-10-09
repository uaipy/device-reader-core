import { MessageRepository } from "../../interfaces/repositories/message-repository";
import { GetAllMessagesUseCase } from "../../interfaces/use-cases/get-all-messages-use-case";
import { MessageResponseModel } from "../../models/message";

export class GetAllMessages implements GetAllMessagesUseCase {
  messageRepository: MessageRepository;
  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(): Promise<MessageResponseModel[]> {
    const result = await this.messageRepository.getMessages();
    return result;
  }
}
