import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {id:decoded.userId};
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
