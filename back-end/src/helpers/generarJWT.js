import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Clave secreta para el JWT

export const generarJWT = (Id_User) => {
  return jwt.sign({ Id_User:  Id_User}, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

