<<<<<<< HEAD
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Clave secreta para el JWT
=======
import jwt from "jsonwebtoken";
>>>>>>> 7d00776b81fd3970aceff38473a2d042d5040ad2

export const generarJWT = (Id_User) => {
  return jwt.sign({ Id_User:  Id_User}, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

