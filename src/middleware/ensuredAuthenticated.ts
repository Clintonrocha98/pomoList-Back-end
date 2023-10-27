import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors";

export const ensuredAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      throw new UnauthorizedError("Token is missing.");
    }
    const [, token] = authHeaders.split(" ");

    verify(token, process.env.SECRET_JWT);

    const { sub } = decode(token);
    request.userId = sub.toString();
    return next();
  };
};
