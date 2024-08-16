import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import { logger } from "./logMiddleware.js";
import bcrypt from "bcrypt";


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

      console.log("Token desde Auth " + token);
      
      // Verifica y decodifica el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log("User Token", decoded.Id_User);


      // const decodedIdUser = decoded.Id_User.toString("utf-8");
      const decodedIdUser = Buffer.from(decoded.Id_User, 'base64').toString('utf-8');
      console.log("Decoding para Id_User: " + decodedIdUser);
      
      

      // console.log("Decoded token: " + JSON.stringify(decoded.Id_User, null, 2));
      
      // UserModel.prototype.comprobarIdUser = async function (Id_User) {
      //   return await bcrypt.compare(Id_User.toString(), decoded.Id_User.toString())
      // }

      // Busca el usuario en la base de datos
      const user = await UserModel.findByPk(decodedIdUser, {
        attributes: { exclude: ["password", "Confirmado", "token"] },
      });

<<<<<<< HEAD

//NO MUESTRA EL TOKEN CON ESTA INSTRUCCION
      // const hashedId_User = await verificarJWT(token);

      // // Busca el usuario en la base de datos usando el ID desencriptado
      // const user = await UserModel.findOne({
      //   where: { hashedId_User }, // Ajusta esto según tu modelo de datos
      //   attributes: { exclude: ["password", "Confirmado", "token"] },
      // });
=======
      console.log("User db", user);
      
      
>>>>>>> 7d00776b81fd3970aceff38473a2d042d5040ad2

      // Verifica si el usuario existe y si el token coincide
      if (!user) {
        return res.status(403).json({ msg: "Usuario no encontrado" });
      }
      // if (await user.comprobarIdUser(user.Id_User)) {
        
      //   // Añade el usuario a la solicitud
      // }
      
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

