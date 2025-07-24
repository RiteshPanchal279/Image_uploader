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
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
// ---------------> without Bearer --------------->

// export const authMiddleware = (req, res, next) => {
//   try {
//     const token = req.header("Authorization");

//     if (!token) {
//       return res.status(401).json({ message: "Access Denied. No token provided." });
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
//     req.user = decoded.userId; // Attach userId to the request
//     next(); // Continue to the next middleware or route
//   } catch (error) {
//     console.error("JWT verification failed:", error);
//     return res.status(401).json({ message: "Invalid or expired token." });
//   }
// };