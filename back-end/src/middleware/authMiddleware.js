import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import { logger } from "./logMiddleware.js";


const verificacion = async (req, res, next) => {
  let segurity;

  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extrae el segurity del encabezado
      segurity = req.headers.authorization.split(" ")[1];

      console.log("Token desde Auth " + segurity);
      
      // Verifica y decodifica el segurity
      const decoded = jwt.verify(segurity, process.env.JWT_SECRET);

      console.log("User Token", decoded.Id_User);


      // const decodedIdUser = decoded.Id_User.toString("utf-8");
      const decodedIdUser = Buffer.from(decoded.Id_User, 'base64').toString('utf-8');
      console.log("Decoding para Id_User: " + decodedIdUser);
      
    
      const user = await UserModel.findByPk(decodedIdUser, {
        attributes: { exclude: ["password", "Confirmado", "segurity"] },
      });

      console.log("User db", user);

      if (!user) {
        return res.status(403).json({ msg: "Usuario no encontrado" });
      }
     
      
      req.usuario = user;
      return next();
    } catch (error) {
   
      logger.error("Token no válido o expirado", error);
      return res.status(403).json({ msg: "Token no válido o expirado" });
    }
  }


  if (!segurity) {
    return res.status(403).json({ msg: "Token no válido o inexistente" });
  }

  next();
};

export default verificacion;

