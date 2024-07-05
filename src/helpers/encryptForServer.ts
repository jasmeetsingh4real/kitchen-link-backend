const jwt = require("jsonwebtoken");

export const encryptForServer = (data: any) => {
  return jwt.sign(data, process.env.JWT_SERVER_SECRET_KEY);
};
