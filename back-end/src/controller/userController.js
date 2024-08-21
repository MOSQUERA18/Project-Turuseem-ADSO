// import { Sequelize } from "sequelize";
import UserModel from "../models/userModel.js";
import { generarJWT } from "../helpers/generarJWT.js";
import { generarToken } from "../helpers/generarToken.js";
import { emailRegistro } from "../helpers/emailRegistro.js";
import { emailOlvidePassword } from "../helpers/emailOlvidePassword.js";
import { logger } from "../middleware/logMiddleware.js";
import bcrypt from "bcryptjs";

export const autenticar = async (req, res) => {
  const { Cor_User, password } = req.body;
  //Comprobar si el user existe
  const usuario = await UserModel.findOne({
    where: { Cor_User: Cor_User },
  });
  if (!usuario) {
    const error = new Error("El usuario no existe o contraseña no valida!");
    return res.status(404).json({ msg: error.message });
  }
  //Comprobar si el usuario esta confirmado
  if (!usuario.Confirmado) {
    const error = new Error("Tu cuenta no está confirmada!");
    return res.status(403).json({ msg: error.message });
  }
  
  
  //Comprobar password
  if (await usuario.comprobarPassword(password)) {
    const userString = usuario.Id_User.toString()
    const Id_UserHash = Buffer.from(userString).toString('base64');

    // console.log(Id_UserHash);
    
    res.json({
      Id_User: usuario.Id_User,
      Nom_User: usuario.Nom_User,
      Cor_User: usuario.Cor_User,
      token: generarJWT(Id_UserHash),
    });
  } else {
    const error = new Error(
      "La contraseña es incorrecta o el correo no es valido!"
    );
    return res.status(403).json({ msg: error.message });
  }
};

export const CreateAccount = async (req, res) => {
  const { Cor_User, Nom_User, Id_User } = req.body;

  // Validar que Id_User sea un número
  if (isNaN(Id_User)) {
    const error = new Error("El Documento del usuario debe ser un número.");
    return res.status(400).json({ message: error.message });
  }

  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (!nameRegex.test(Nom_User)) {
    const error = new Error("El Nombre del usuario debe ser solo en letras.");
    return res.status(400).json({ message: error.message });
  }

  // Validar el formato del correo electrónico
  const emailRegex = /(gmail\.com|hotmail\.com)/;
  if (!emailRegex.test(Cor_User)) {
    const error = new Error(
      "El correo electrónico debe ser válido y terminar en @gmail.com o @hotmail.com."
    );
    return res.status(400).json({ message: error.message });
  }

  // Prevenir usuarios duplicados por correo
  try {
    const existeCorreo = await UserModel.findOne({
      where: { Cor_User: Cor_User },
    });
    if (existeCorreo) {
      const error = new Error("El correo electrónico ya está en uso!");
      return res.status(400).json({ message: error.message });
    }

    // Prevenir usuarios duplicados por documento
    const existeUser = await UserModel.findOne({
      where: { Id_User: Id_User },
    });
    if (existeUser) {
      const error = new Error("El documento ya está registrado!");
      return res.status(400).json({ message: error.message });
    }

    // Crear el nuevo usuario
    const newUser = await UserModel.create({
      ...req.body,
      token: generarToken(), // Genera un token de confirmación
      Confirmado: false, // La cuenta no está confirmada inicialmente
    });

    // Enviar Email con token de confirmación
    emailRegistro({
      Cor_User,
      Nom_User,
      token: newUser.token,
    });

    res.json({
      msg: "Usuario creado. Revisa tu correo para confirmar tu cuenta.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    logger.error(error);
  }
};

export const perfil = async (req, res) => {
  const { usuario } = req;
  res.json({ usuario });
};

export const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await UserModel.findOne({
    where: { token: token },
  });
  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.Confirmado = true;
    await usuarioConfirmar.save();

    // Generar el token JWT después de confirmar la cuenta
    const jwtToken = generarJWT(usuarioConfirmar.Id_User);

    return res.status(200).json({
      msg: "Cuenta confirmada correctamente",
      token: jwtToken,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error al confirmar el usuario" });
  }
};

export const olvidePassword = async (req, res) => {
  const { Cor_User } = req.body;
  const existeUsuario = await UserModel.findOne({
    where: { Cor_User: Cor_User },
  });
  if (!existeUsuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  try {
    existeUsuario.token = generarToken();
    await existeUsuario.save();

    // Enviar Email
    emailOlvidePassword({
      Cor_User,
      Nom_User: existeUsuario.Nom_User,
      token: existeUsuario.token,
    });
    res.json({ msg: "Hemos enviado un correo con las instrucciones!" });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

export const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenUsuario = await UserModel.findOne({
    where: { token: token },
  });
  if (tokenUsuario) {
    // Token válido
    res.json({ msg: "Token válido, el usuario existe!" });
  } else {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
};

export const nuevoPassword = async (req, res) => {
  // const { token } = req.params
  const { password } = req.body;

  const usuario = await UserModel.findOne({
    where: { token: req.params.token },
  });
  if (!usuario) {
    const error = new Error("Hubo un error");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = null;
    usuario.password = password;
    await usuario.save();
    res.json({ msg: "Contraseña cambiada correctamente!" });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};
