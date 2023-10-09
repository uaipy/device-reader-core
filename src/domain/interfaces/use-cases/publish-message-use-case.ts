import { MessageRequestModel } from "../../models/message";

export interface PublishMessageUseCase {
  execute(message: MessageRequestModel): Promise<{ success: boolean }>;
}
