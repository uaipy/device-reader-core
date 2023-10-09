import { Pool } from "pg";
import { PGMessageDataSource } from "../../data/data-sources/postgresql/pg-message-data-source";
import { MessageRepositoryImpl } from "../../domain/repositories/message-repository";
import { GetAllMessages } from "../../domain/use-cases/message/get-all-messages";
import { PublishMessage } from "../../domain/use-cases/message/publish-message";
import MessagesRouter from "../../presentation/routers/message-router";
import 'dotenv/config'

export async function getPGDS() {
  const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
  });
  return new PGMessageDataSource(db);
}

export async function getMessageMiddleWare() {
  const dataSource = await getPGDS();

  return MessagesRouter(
    new GetAllMessages(new MessageRepositoryImpl(dataSource)),
    new PublishMessage(
      new MessageRepositoryImpl(dataSource),
    )
  );
}
