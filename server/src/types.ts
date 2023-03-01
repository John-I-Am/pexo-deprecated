import { DecodedToken } from "types";

declare module "express-serve-static-core" {
  // eslint-disable-next-line no-unused-vars
  interface Request {
    decodedToken: DecodedToken
  }
}
