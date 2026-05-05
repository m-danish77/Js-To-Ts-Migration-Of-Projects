import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1. Check if the header exists and starts with "Bearer"
      token = req.headers.authorization.split(" ")[1];

      // 2. Split the string: "Bearer <token>" -> ["Bearer", "<token>"]
      // We take the index [1] to get the actual token string
      // Now decoded have the payload or user information use store in the token and some other timestamps information in it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user information to req so we can use it later.
      req.user = decoded;

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
