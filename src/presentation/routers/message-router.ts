import express from "express";
import { Request, Response } from "express";
import { defaultHttpHeaders } from "..";
import { GetAllMessagesUseCase } from "../../domain/interfaces/use-cases/get-all-messages-use-case";
import { PublishMessageUseCase } from "../../domain/interfaces/use-cases/publish-message-use-case";

export default function MessagesRouter(
  getAllMessagesUseCase: GetAllMessagesUseCase,
  publishMessageUseCase: PublishMessageUseCase
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const messages = await getAllMessagesUseCase.execute();
      res.statusCode = 200;
      res.set(defaultHttpHeaders()).send(messages);
    } catch (err) {
      console.log(err);
      res.status(500).set(defaultHttpHeaders()).send({ message: "Error fetching data" });
    }
  });

  router.post("/publish", async (req: Request, res: Response) => {
    try {
      const requestData = req.body;
      if (Array.isArray(requestData)) {
        const actions: any[] = [];
        requestData.map((element) =>
          actions.push(publishMessageUseCase.execute(element as any))
        );
        Promise.all(actions);
      } else {
        await publishMessageUseCase.execute(requestData);
      }
      res.statusCode = 201;
      res.set(defaultHttpHeaders()).json({ success: true });
    } catch (err) {
      console.log(err.message);
      res.status(500).set(defaultHttpHeaders()).send({ message: "Error saving data" });
    }
  });

  return router;
}
