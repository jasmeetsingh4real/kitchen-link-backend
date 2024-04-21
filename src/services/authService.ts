import { TUser } from "../schemas/UsersSchema";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const genSaltAsync = promisify(bcrypt.genSalt);
const hashAsync = promisify(bcrypt.hash);

export class AuthService {
  static getAuthToken = (user: TUser, isSeller = false) => {
    if (isSeller) {
      const sellerToken = jwt.sign(user, process.env.JWT_SELLER_SECRET_KEY);
      return sellerToken;
    }
    const token = jwt.sign(user, process.env.JWT_SECRET_KEY);
    return token;
  };

  static encryptPassword = async (password: string) => {
    const salt = await genSaltAsync(10);
    const hash = await hashAsync(password, salt);
    return hash;
  };
  static verifyPassword = async (password: string, hash: string) => {
    const match = await bcrypt.compare(password, hash);
    return match;
  };
  static verifyAuthToken = async (token: string, isSeller = false) => {
    if (isSeller) {
      const sellerTokenVerified = await jwt.verify(
        token,
        process.env.JWT_SELLER_SECRET_KEY
      );
      return sellerTokenVerified;
    }
    const tokenVerified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    return tokenVerified;
  };
}
