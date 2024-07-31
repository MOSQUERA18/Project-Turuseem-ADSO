import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import { logger } from "./logMiddleware.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await UserModel.findByPk(decoded.Id_User, {
        attributes: { exclude: ["password", "Confirmado", "token"] },
      });
      return next();
    } catch (error) {
      // return res.status(403).json({ msg: "Token no válido" });
      logger.error(error);
    }
  }
  if (!token) {
    return res.status(403).json({ msg: "Token no válido o inexistente" });
  }
  next();
};

export default checkAuth;
