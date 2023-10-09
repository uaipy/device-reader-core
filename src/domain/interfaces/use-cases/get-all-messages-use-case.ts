import { MessageResponseModel } from "../../models/message";

export interface GetAllMessagesUseCase {
    execute(): Promise<MessageResponseModel[]>;
}