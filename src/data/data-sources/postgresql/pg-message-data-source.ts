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
    isSyncedRemotely: item.is_synced_remotely,
    messageReadDate: item.message_read_date,
  });

  private adaptBatchToDomain = (itens: any[]): MessageResponseModel[] =>
    itens.map((item) => ({
      id: item.id,
      deviceId: item.device_id,
      data: item.data,
      isSyncedRemotely: item.is_synced_remotely,
      messageReadDate: item.message_read_date,
    }));

  async create(message: MessageRequestModel): Promise<MessageResponseModel> {
    const dbResponse = await this.db.query(
      `INSERT INTO ${DB_TABLE} (
          device_id, 
          data, 
          message_read_date, 
          active, 
          created_at, 
          updated_at, 
          deleted_at
        ) VALUES (
          $1, $2, $3, TRUE, NOW(), NOW(), NULL
        ) RETURNING *;`,
      [
        message.deviceId,
        message.data,
        message.messageReadDate
      ]
    );
    return this.adaptToDomain(dbResponse.rows[0]);
  }

  async updateSyncedRemotely(
    messageId: number,
    isSyncedRemotely: boolean
  ): Promise<void> {
    await this.db.query(
      `UPDATE ${DB_TABLE}
      SET is_synced_remotely = $1, updated_at = now() WHERE id = $2;`,
      [isSyncedRemotely, messageId]
    );
  }

  async getAll(): Promise<MessageResponseModel[]> {
    const dbResponse = await this.db.query(`select * from ${DB_TABLE};`);
    return this.adaptBatchToDomain(dbResponse.rows);
  }

  async getUnsynchronizedMessagesRemotely(): Promise<
    MessageResponseModel[] | undefined
  > {
    const dbResponse = await this.db.query(
      `select * from ${DB_TABLE} where is_synced_remotely = false;`
    );
    return dbResponse.rows.length > 0
      ? this.adaptBatchToDomain(dbResponse.rows)
      : undefined;
  }
}
