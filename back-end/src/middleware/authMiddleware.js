import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import { logger } from "./logMiddleware.js";


const checkAuth = async (req, res, next) => {
  let token;

  // Verifica si hay un token en el encabezado Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extrae el token del encabezado
      token = req.headers.authorization.split(" ")[1];
      // Verifica y decodifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca el usuario en la base de datos
      const user = await UserModel.findByPk(decoded.Id_User, {
        attributes: { exclude: ["password", "Confirmado", "token"] },
      });


//NO MUESTRA EL TOKEN CON ESTA INSTRUCCION
      // const hashedId_User = await verificarJWT(token);

      // // Busca el usuario en la base de datos usando el ID desencriptado
      // const user = await UserModel.findOne({
      //   where: { hashedId_User }, // Ajusta esto según tu modelo de datos
      //   attributes: { exclude: ["password", "Confirmado", "token"] },
      // });

      // Verifica si el usuario existe y si el token coincide
      if (!user) {
        return res.status(403).json({ msg: "Usuario no encontrado" });
      }

      // Añade el usuario a la solicitud
      req.usuario = user;
      return next();
    } catch (error) {
      // Maneja errores de token, como expiración o firma inválida
      logger.error("Token no válido o expirado", error);
      return res.status(403).json({ msg: "Token no válido o expirado" });
    }
  }

  // Si no hay token, devuelve un error
  if (!token) {
    return res.status(403).json({ msg: "Token no válido o inexistente" });
  }
  
  // Si el token está presente pero no se pasa la verificación, se responde con error
  next();
};

export default checkAuth;

