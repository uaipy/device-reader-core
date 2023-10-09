import {
  MessageRequestModel,
  MessageResponseModel,
} from "../../../domain/models/message";
import { MessageDataSource } from "../../interfaces/data-sources/message-data-source";
import { SQLDatabaseWrapper } from "../../interfaces/data-sources/sql-database-wrapper";

const DB_TABLE = "tb_message";

export class PGMessageDataSource implements MessageDataSource {
  private db: SQLDatabaseWrapper;
  constructor(db: SQLDatabaseWrapper) {
    this.db = db;
  }

  private adaptToDomain = (item: any): MessageResponseModel => ({
    id: item.id,
    deviceId: item.device_id,
    data: item.data,
    messageReadDate: item.message_read_date,
  });

  private adaptBatchToDomain = (itens: any[]): MessageResponseModel[] =>
    itens.map((item) => ({
      id: item.id,
      deviceId: item.device_id,
      data: item.data,
      messageReadDate: item.message_read_date,
    }));

  async create(message: MessageRequestModel): Promise<MessageResponseModel> {
    const dbResponse = await this.db.query(
      `INSERT INTO ${DB_TABLE} VALUES (
        DEFAULT,$1,$2,$3, true,now(),now(),null
        ) RETURNING *;`,
      [message.deviceId, message.data, message.messageReadDate]
    );
    return this.adaptToDomain(dbResponse.rows[0]);
  }

  async getAll(): Promise<MessageResponseModel[]> {
    const dbResponse = await this.db.query(
      `select * from ${DB_TABLE} where active = true ORDER BY message_read_date ASC LIMIT 5;`
    );
    return this.adaptBatchToDomain(dbResponse.rows);
  }
}
