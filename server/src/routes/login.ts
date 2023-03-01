import express, { Request, Response } from "express";
import { UserCredentials } from "types";
import loginService from "../services/login";
import typeguards from "../typeguards";

const loginRouter = express.Router();

loginRouter.post("/", async (request: Request, response: Response): Promise<void> => {
  const userCredential: UserCredentials = typeguards.toUserCredential(request.body);
  const result: false | object = await loginService.authUser(userCredential);

  if (result) {
    response.status(200).send(result);
  } else {
    response.status(401).json({ error: "invalid credentials" });
  }
});

export default loginRouter;
