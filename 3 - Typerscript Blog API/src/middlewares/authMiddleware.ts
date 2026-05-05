import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface MyJwtPayload {
  userId: string;
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. Check if the header exists and starts with "Bearer"
      token = req.headers.authorization.split(" ")[1] as string;

      // 2. Split the string: "Bearer <token>" -> ["Bearer", "<token>"]
      // We take the index [1] to get the actual token string
      // Now decoded have the payload or user information use store in the token and some other timestamps information in it
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        // below code was necessary it was not working otherwise
      ) as any as MyJwtPayload;

      // Attach the user information to req so we can use it later.
      (req as any).user = decoded;

      next();
    } catch (e) {
      return res.status(401).json({ message: "Not Authorized. No Token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not Authorized. No Token" });
  }
};

export default protect;
