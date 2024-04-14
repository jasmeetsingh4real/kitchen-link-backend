import jwt = require("jsonwebtoken");
export const verifyToken = (req: any, res: any, next) => {
  const token = req.header("authToken");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
