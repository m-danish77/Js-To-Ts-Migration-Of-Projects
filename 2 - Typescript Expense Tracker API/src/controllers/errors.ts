import { Request, Response } from "express";

const errorController = (req: Request, res: Response) => {
  res
    .status(404)
    .json({ message: `Can't find ${req.originalUrl} on this server.` });
};

export default errorController;
