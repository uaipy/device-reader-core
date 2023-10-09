import { isArray } from "chart.js/dist/helpers/helpers.core";
import express from "express";
import { Request, Response } from "express";
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
      res.send(messages);
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Error fetching data" });
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
      res.json({ success: true });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: "Error saving data" });
    }
  });

  return router;
}
