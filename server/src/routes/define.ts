import express, { Request, Response } from "express";
import dictionaryService from "../services/dictionary";

const defineRouter = express.Router();

defineRouter.get("/:word", async (request: Request, response: Response): Promise<void> => {
  const result: any = await dictionaryService.define(request.params.word);

  if (result.error) {
    response.status(404).json({ error: result.error });
  }

  response.json(result);
});

export default defineRouter;
