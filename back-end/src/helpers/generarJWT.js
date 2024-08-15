import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Clave secreta para el JWT
const JWT_SECRET = process.env.JWT_SECRET;

export const generarJWT = async (Id_User) => {
  // Generar un hash del Id_User
  const hashedId_User = await bcrypt.hash(Id_User.toString(), 10);

  // Payload del JWT con el hash
  const tokenPayload = {
    hashedId_User
  };

  // Firmar el token con el secreto JWT
  return jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });
};


// export const verificarJWT = async (token) => {
//   try {
//     // Verificar el token JWT
//     const decoded = jwt.verify(token, JWT_SECRET);
    
//     // Aquí no desencriptamos sino que verificamos el hash
//     const hashedId_User = decoded.hashedId_User;

//     // Aquí puedes retornar el hash o realizar alguna acción adicional
//     return hashedId_User;
//   } catch (error) {
//     throw new Error('Token inválido');
//   }
// };


